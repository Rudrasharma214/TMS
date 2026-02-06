import { STATUS } from "../../../constants/statusCodes.js";
import AppError from "../../../utils/AppError.js";
import { UserRepository } from "../repositories/user.repositories.js";
import { VerifyTokenRepository } from "../repositories/verifyToken.repositories.js";
import { OtpRepository } from "../repositories/otp.repositories.js";
import { hashPassword, comparePassword } from "../utils/hashPassword.util.js";
import {
    generateToken,
    generateRefreshToken,
    generateEmailVerifyToken,
    verifyEmailToken,
    verifyPasswordToken,
    verifyToken,
} from "../utils/token.util.js";
import { publishEvent } from "../../../events/eventPublisher.js";
import authNames from "../../../events/eventNames/authNames.js";
import { sequelize } from "../../../../config/db.js";
import { generateOTP } from "../utils/generateOTP.utils.js";
import env from "../../../../config/env.js";

const userRepository = new UserRepository();
const verifyTokenRepository = new VerifyTokenRepository();
const otpRepository = new OtpRepository();

export class AuthService {
    /* Signup */
    async signup(name, email, password) {
        const transaction = await sequelize.transaction();
        try {
            const existingUser = await userRepository.findByEmail(email, transaction);
            if (existingUser) {
                await transaction.rollback();
                throw new AppError("Email is already registered.", STATUS.CONFLICT);
            }

            const passwordHashed = await hashPassword(password);

            const user = await userRepository.createUser({
                name,
                email,
                password: passwordHashed,
            }, transaction);

            const token = await generateEmailVerifyToken({ id: user.id, type: 'email_verify' });

            await verifyTokenRepository.createToken({
                userId: user.id,
                token: token,
                expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000),
                type: 'email_verification',
                transaction
            });

            await transaction.commit();

            const verifyLink = `${env.FRONTEND_URL}/verify-email?token=${token}`;

            publishEvent(authNames.USER_SIGNUP, {
                name: user.name,
                email: user.email,
                verifyLink,
            });

            return {
                success: true,
                message: "User registered successfully.",
                data: { id: user.id, name: user.name, email: user.email },
            };
        } catch (error) {
            await transaction.rollback();
            return {
                success: false,
                message: "An error occurred during signup.",
                statusCode: STATUS.INTERNAL_ERROR,
                errors: error.message
            };
        }
    }

    /* VerifyEmail */
    async verifyEmail(token) {
        const transaction = await sequelize.transaction();
        try {
            const userId = await verifyEmailToken(token);

            const record = await verifyTokenRepository.findByUserIdAndType(userId, 'email_verification', transaction);

            if (!record || record.expires_at < new Date()) {
                await transaction.rollback();
                return { success: false, message: "Invalid or expired token.", statusCode: STATUS.BAD_REQUEST };
            }

            await verifyTokenRepository.deleteTokenById(record.id, transaction);

            const user = await userRepository.findById(userId, transaction);

            const accessToken = generateToken(user.toJSON());
            const refreshToken = generateRefreshToken(user.toJSON());

            await user.update(
                { isVerified: true, refreshToken, lastLoginAt: new Date() },
                { transaction }
            );

            await transaction.commit();

            publishEvent(authNames.EMAIL_VERIFICATION, {
                name: user.name,
                email: user.email,
            });

            return {
                success: true,
                message: "Email verified successfully.",
                data: { accessToken, refreshToken },
            };
        } catch (err) {
            await transaction.rollback();
            return { success: false, message: "Email verification failed.", error: err.message, statusCode: STATUS.INTERNAL_ERROR };
        }
    }

    /* Login */
    async login(email, password) {
        const transaction = await sequelize.transaction();
        try {
            const user = await userRepository.findByEmail(email, transaction);
            if (!user || !user.isVerified) {
                await transaction.rollback();
                return { success: false, message: "Invalid credentials or user not verified.", statusCode: STATUS.UNAUTHORIZED };
            }

            const isValid = await comparePassword(password, user.password);
            if (!isValid) {
                await transaction.rollback();
                return { success: false, message: "Invalid email or password.", statusCode: STATUS.UNAUTHORIZED };
            }

            const lastLogin = user.lastLoginAt;
            const currentDate = new Date();
            const daysSinceLastLogin = lastLogin ? Math.floor((currentDate - new Date(lastLogin)) / (1000 * 60 * 60 * 24)) : null;

            if (daysSinceLastLogin !== null && daysSinceLastLogin >= 15) {
                const otpResult = await generateOTP(user.id, transaction);

                if (!otpResult.success) {
                    await transaction.rollback();
                    return otpResult;
                }

                await transaction.commit();

                publishEvent(authNames.USER_LOGIN, {
                    name: user.name,
                    email: user.email,
                    otp: otpResult.data.otp,
                });

                return {
                    success: true,
                    requiredOtp: true,
                    message: "OTP sent to your email. Please verify to complete login.",
                    data: {
                        otpRequired: true,
                        userId: user.id
                    },
                };
            }

            const accessToken = generateToken(user.toJSON());
            const refreshToken = generateRefreshToken(user.toJSON());

            await user.update({ refreshToken, lastLoginAt: new Date(), }, { transaction });
            await transaction.commit();
            return {
                success: true,
                requiredOtp: false,
                message: "Login successful.",
                data: { accessToken, refreshToken },
            };
        } catch (error) {
            await transaction.rollback();
            return {
                success: false,
                message: "An error occurred during login.",
                statusCode: STATUS.INTERNAL_ERROR,
                errors: error.message
            }
        }
    }

    /* VerifyLoginOTP */
    async verifyLoginOTP(userId, otp) {
        const transaction = await sequelize.transaction();
        try {
            const user = await userRepository.findById(userId, transaction);
            if (!user) {
                await transaction.rollback();
                return { success: false, message: "User not found.", statusCode: STATUS.NOT_FOUND };
            }

            const otpRecord = await otpRepository.findByUserIdAndCode(userId, otp, transaction);

            if (!otpRecord || otpRecord.expires_at < new Date()) {
                await transaction.rollback();
                return { success: false, message: "Invalid or expired OTP.", statusCode: STATUS.BAD_REQUEST };
            }

            const accessToken = generateToken(user.toJSON());
            const refreshToken = generateRefreshToken(user.toJSON());

            await user.update({ refreshToken, lastLoginAt: new Date() }, { transaction });

            await otpRepository.deleteOtpById(otpRecord.id, transaction);

            await transaction.commit();

            return {
                success: true,
                message: "OTP verified successfully. Login complete.",
                data: { accessToken, refreshToken },
            };
        } catch (error) {
            await transaction.rollback();
            return {
                success: false,
                message: "An error occurred during OTP verification.",
                statusCode: STATUS.INTERNAL_ERROR,
                errors: error.message
            }
        }
    };

    /* ForgotPassword */
    async forgotPassword(email) {
        const transaction = await sequelize.transaction();
        try {
            const user = await userRepository.findByEmail(email, transaction);
            if (!user) {
                await transaction.rollback();
                return { success: false, message: "If user exists, a password reset link will be sent to the email.", statusCode: STATUS.OK };
            }

            const token = generateEmailVerifyToken({ id: user.id, type: 'password_reset' });

            await verifyTokenRepository.createToken({
                userId: user.id,
                token,
                expiresAt: new Date(Date.now() + 1 * 60 * 60 * 1000),
                type: 'password_reset',
                transaction
            });

            const resetLink = `${env.FRONTEND_URL}/reset-password?token=${token}`;

            publishEvent(authNames.RESET_PASSWORD, {
                name: user.name,
                email: user.email,
                resetLink,
            });

            await transaction.commit();

            return {
                success: true,
                message: "If user exists, a password reset link will be sent to the email.",
            }
        } catch (error) {
            await transaction.rollback();
            return {
                success: false,
                message: "An error occurred during forgot password process.",
                statusCode: STATUS.INTERNAL_ERROR,
                errors: error.message
            }
        }
    }

    /* ResetPassword */
    async resetPassword(token, password) {
        const transaction = await sequelize.transaction();
        try {
            const userId = await verifyPasswordToken(token);

            const record = await verifyTokenRepository.findByUserIdAndType(userId, 'password_reset', transaction);

            if (!record || record.expires_at < new Date()) {
                await transaction.rollback();
                return { success: false, message: "Invalid or expired token.", statusCode: STATUS.BAD_REQUEST };
            }

            await verifyTokenRepository.deleteTokenById(record.id, transaction);

            const user = await userRepository.findById(userId, transaction);

            const passwordHashed = await hashPassword(password);

            await user.update(
                { password: passwordHashed },
                { transaction }
            );

            await transaction.commit();

            return {
                success: true,
                message: "Password reset successfully.",
            };
        } catch (err) {
            await transaction.rollback();
            return { success: false, message: "Password reset failed.", error: err.message, statusCode: STATUS.INTERNAL_ERROR };
        }

    }

    /* ChangePassword */
    async changePassword(userId, oldPassword, newPassword) {
        try {
            const user = await userRepository.findById(userId);
            if (!user) {
                return { success: false, message: "User not found.", statusCode: STATUS.NOT_FOUND };
            }
            const isValid = await comparePassword(oldPassword, user.password);
            if (!isValid) {
                return { success: false, message: "Old password is incorrect.", statusCode: STATUS.BAD_REQUEST };
            }

            const newPasswordHashed = await hashPassword(newPassword);

            await user.update({ password: newPasswordHashed });

            return {
                success: true,
                message: "Password changed successfully.",
            };
        } catch (error) {
            return {
                success: false,
                message: "An error occurred during password change.",
                statusCode: STATUS.INTERNAL_ERROR,
                errors: error.message
            }
        }
    }

    /* RefreshToken */
    async refreshToken(token) {
        try {
            const payload = verifyToken(token);
            const userId = payload.id;
            
            const user = await userRepository.findById(userId);
            if (!user || user.refreshToken !== token) {
                return { success: false, message: "Invalid refresh token.", statusCode: STATUS.UNAUTHORIZED };
            }

            const accessToken = await generateToken(user.toJSON());

            return {
                success: true,
                message: "Token refreshed successfully.",
                data: { accessToken },
            };
        } catch (error) {
            return {
                success: false,
                message: "An error occurred during token refresh.",
                statusCode: STATUS.INTERNAL_ERROR,
                errors: error.message
            }
        }
    }

    /* Logout */
    async logout(userId) {
        try {
            const user = await userRepository.findById(userId);
            if (!user) {
                return { success: false, message: "User not found.", statusCode: STATUS.NOT_FOUND };
            }

            await user.update({ refreshToken: null });

            return {
                success: true,
                message: "Logout successful.",
            };
        } catch (error) {
            return {
                success: false,
                message: "An error occurred during logout.",
                statusCode: STATUS.INTERNAL_ERROR,
                errors: error.message
            }
        };
    }
};