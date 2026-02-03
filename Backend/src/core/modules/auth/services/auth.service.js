import { STATUS } from "../../../constants/statusCodes.js";
import AppError from "../../../utils/AppError.js";
import User from "../models/user.model.js";
import VerifyToken from "../models/verifyToken.model.js";
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

export class AuthService {
    /* Signup */
    async signup(name, email, password) {
        if (!name || !email || !password) {
            return { success: false, message: "Name, email, and password are required." };
        }

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
            userId: user.id,
            token,
            type: 'email_verification',
            expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000),
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
    }

    /* VerifyEmail */
    async verifyEmail(token) {
        if (!token) {
            return { success: false, message: "Verification token is required." };
        }

        const transaction = await sequelize.transaction();

        try {
            const userId = await verifyEmailToken(token);

            const record = await VerifyToken.findOne(
                { where: { userId } },
                { transaction }
            );

            if (!record || record.expiresAt < new Date()) {
                return { success: false, message: "Invalid or expired token." };
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

            return {
                success: true,
                message: "Email verified successfully.",
                data: { accessToken, refreshToken },
            };
        } catch (err) {
            await transaction.rollback();
            return { success: false, message: "Email verification failed.", error: err.message };
        }
    }

    /* Login */
    async login(email, password) {
        if (!email || !password) {
            return { success: false, message: "Email and password are required." };
        }

        const user = await User.findOne({ where: { email } });
        if (!user || !user.isVerified) {
            return { success: false, message: "Invalid credentials or user not verified." };
        }

        const isValid = await comparePassword(password, user.password);
        if (!isValid) {
            return { success: false, message: "Invalid email or password." };
        }

        const accessToken = generateToken(user.toJSON());
        const refreshToken = generateRefreshToken(user.toJSON());

        await user.update({ refreshToken });

        return {
            success: true,
            message: "Login successful.",
            data: { accessToken, refreshToken },
        };
    }

    /* ForgotPassword */
    async forgotPassword(email) {
        if(!email) {
            return { success: false, message: "Email is required." };
        }
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return { success: false, message: "If user exists, a password reset link will be sent to the email." };
        }

        const token = generateEmailVerifyToken({ id: user.id, type: 'password_reset' });

        await VerifyToken.create({
            userId: user.id,
            token,
            type: 'password_reset',
            expiresAt: new Date(Date.now() + 1 * 60 * 60 * 1000),
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
    }

    /* ResetPassword */
    async resetPassword(token, password) {
        if(!token || !password) {
            return { success: false, message: "Token and new password are required." };
        }
        const transaction = await sequelize.transaction();

        try {
            const userId = await verifyEmailToken(token);

            const record = await VerifyToken.findOne(
                { where: { userId } },
                { transaction }
            );

            if (!record || record.expiresAt < new Date()) {
                await transaction.rollback();
                return { success: false, message: "Invalid or expired token." };
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
            return { success: false, message: "Password reset failed.", error: err.message };
        }

    }

    /* ChangePassword */
    async changePassword(userId, oldPassword, newPassword) {
        const user = await User.findByPk(userId);
        if (!user) {
            return { success: false, message: "User not found." };
        }

        if(!oldPassword || !newPassword) {
            return { success: false, message: "Old and new passwords are required." };
        }

        const isValid = await comparePassword(oldPassword, user.password);
        if (!isValid) {
            return { success: false, message: "Old password is incorrect." };
        }

        const newPasswordHashed = await hashPassword(newPassword);

        await user.update({ password: newPasswordHashed });

        return {
            success: true,
            message: "Password changed successfully.",
        };
    }

    /* RefreshToken */
    async refreshToken(userId, token) {
        const user = await User.findByPk(userId);
        if (!user || user.refreshToken !== token) {
            return { success: false, message: "Invalid refresh token." };
        }

        const accessToken = await generateToken(user.toJSON());

        return {
            success: true,
            message: "Token refreshed successfully.",
            data: { accessToken },
        };        
    }

    async logout(userId) {
        const user = await User.findByPk(userId);
        if (!user) {
            return { success: false, message: "User not found." };
        }

        await user.update({ refreshToken: null });

        return {
            success: true,
            message: "Logout successful.",
        };
    };
}
