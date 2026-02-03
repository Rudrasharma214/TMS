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
            const decoded = await verifyEmailToken(token);

            const record = await VerifyToken.findOne(
                { where: { userId: decoded.userId } },
                { transaction }
            );

            if (!record || record.expiresAt < new Date()) {
                throw new Error("Invalid token");
            }

            await record.update({ is_used: true }, { transaction });

            const user = await User.findByPk(decoded.userId, { transaction });

            const accessToken = generateToken(user);
            const refreshToken = generateRefreshToken(user);

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
            return { success: false, message: "Email verification failed." };
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

        const accessToken = generateToken(user);
        const refreshToken = generateRefreshToken(user);

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

        // In a real implementation, generate a reset token and send email
    }

    /* ResetPassword */
    async resetPassword(token, password) {
        return { success: true, message: "Password reset successful." };
    }
}
