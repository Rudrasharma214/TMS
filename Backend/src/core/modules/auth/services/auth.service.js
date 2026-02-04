import { STATUS } from "../../../constants/statusCodes.js";
import AppError from "../../../utils/AppError.js";
import User from "../models/user.model.js";
import VerifyToken from "../models/verifyToken.model.js";
import OTP from "../models/otp.model.js";
import { hashPassword, comparePassword } from "../utils/hashPassword.util.js";
import {
    generateToken,
    generateRefreshToken,
    generateEmailVerifyToken,
    verifyEmailToken,
} from "../utils/token.util.js";
import { publishEvent } from "../../../events/eventPublisher.js";
import authNames from "../../../events/eventNames/authNames.js";
import { sequelize } from "../../../../config/db.js";
import { generateOTP } from "../utils/generateOTP.utils.js";

export class AuthService {
    /* Signup */
    async signup(name, email, password) {
        if (!name || !email || !password) {
            return { success: false, message: "Name, email, and password are required.", statusCode: STATUS.BAD_REQUEST };
        }

        try {
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                throw new AppError("Email is already registered.", STATUS.CONFLICT);
            }

            const passwordHashed = await hashPassword(password);

            const user = await User.create({
                name,
                email,
                password: passwordHashed,
            });

            const token = await generateEmailVerifyToken(user);

            await VerifyToken.create({
                user_id: user.id,
                token,
                type: 'email_verification',
                expires_at: new Date(Date.now() + 2 * 60 * 60 * 1000),
            });

            const verifyLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

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
        if (!token) {
            return { success: false, message: "Verification token is required.", statusCode: STATUS.BAD_REQUEST };
        }

        const transaction = await sequelize.transaction();

        try {
            const userId = await verifyEmailToken(token);

            const record = await VerifyToken.findOne(
                { where: { user_id: userId } },
                { transaction }
            );

            if (!record || record.expires_at < new Date() || record.is_used) {
                return { success: false, message: "Invalid or expired token.", statusCode: STATUS.BAD_REQUEST };
            }

            await record.update({ is_used: true }, { transaction });

            const user = await User.findByPk(userId, { transaction });

            const accessToken = generateToken(user.toJSON());
            const refreshToken = generateRefreshToken(user.toJSON());

            await user.update(
                { isVerified: true, refreshToken },
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
        if (!email || !password) {
            return { success: false, message: "Email and password are required.", statusCode: STATUS.BAD_REQUEST };
        }

        try {
            const user = await User.findOne({ where: { email } });
            if (!user || !user.isVerified) {
                return { success: false, message: "Invalid credentials or user not verified.", statusCode: STATUS.UNAUTHORIZED };
            }

            const isValid = await comparePassword(password, user.password);
            if (!isValid) {
                return { success: false, message: "Invalid email or password.", statusCode: STATUS.UNAUTHORIZED };
            }

            const lastLogin = user.lastLoginAt;
            const currentDate = new Date();
            const daysSinceLastLogin = lastLogin ? Math.floor((currentDate - new Date(lastLogin)) / (1000 * 60 * 60 * 24)) : null;

            if (daysSinceLastLogin !== null && daysSinceLastLogin >= 15) {
                const otpResult = await generateOTP(user.id);

                if (!otpResult.success) {
                    return otpResult;
                }

                publishEvent(authNames.USER_LOGIN, {
                    name: user.name,
                    email: user.email,
                    otp: otpResult.data.otp,
                });

                return {
                    success: true,
                    requiredOtp: true,
                    message: "OTP sent to your email. Please verify to complete login.",
                    data: { userId: user.id },
                    statusCode: STATUS.OK,
                };
            }

            const accessToken = generateToken(user.toJSON());
            const refreshToken = generateRefreshToken(user.toJSON());

            await user.update({ refreshToken, lastLoginAt: new Date() });

            return {
                success: true,
                message: "Login successful.",
                data: { accessToken, refreshToken },
            };
        } catch (error) {
            return {
                success: false,
                message: "An error occurred during login.",
                statusCode: STATUS.INTERNAL_ERROR,
                errors: error.message
            }
        }
    }

    /* ForgotPassword */
    async forgotPassword(email) {
        if (!email) {
            return { success: false, message: "Email is required.", statusCode: STATUS.BAD_REQUEST };
        }
        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return { success: false, message: "If user exists, a password reset link will be sent to the email.", statusCode: STATUS.OK };
            }

            const token = generateEmailVerifyToken({ id: user.id, type: 'password_reset' });

            await VerifyToken.create({
                user_id: user.id,
                token,
                type: 'password_reset',
                expires_at: new Date(Date.now() + 1 * 60 * 60 * 1000),
            });

            const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

            publishEvent(authNames.FORGOT_PASSWORD, {
                name: user.name,
                email: user.email,
                resetLink,
            });

            return {
                success: true,
                message: "If user exists, a password reset link will be sent to the email.",
            }
        } catch (error) {
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
        if (!token || !password) {
            return { success: false, message: "Token and new password are required.", statusCode: STATUS.BAD_REQUEST };
        }
        const transaction = await sequelize.transaction();

        try {
            const userId = await verifyEmailToken(token);

            const record = await VerifyToken.findOne(
                { where: { user_id: userId } },
                { transaction }
            );

            if (!record || record.expires_at < new Date() || record.is_used) {
                await transaction.rollback();
                return { success: false, message: "Invalid or expired token.", statusCode: STATUS.BAD_REQUEST };
            }

            await record.update({ is_used: true }, { transaction });

            const user = await User.findByPk(userId, { transaction });

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
        const user = await User.findByPk(userId);
        if (!user) {
            return { success: false, message: "User not found.", statusCode: STATUS.NOT_FOUND };
        }

        if (!oldPassword || !newPassword) {
            return { success: false, message: "Old and new passwords are required.", statusCode: STATUS.BAD_REQUEST };
        }

        try {
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
    async refreshToken(userId, token) {
        try {
            const user = await User.findByPk(userId);
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

    async logout(userId) {
        try {
            const user = await User.findByPk(userId);
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