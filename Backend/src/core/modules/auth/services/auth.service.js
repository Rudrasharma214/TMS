import { STATUS } from "../../../constants/statusCodes.js";
import AppError from "../../../utils/AppError.js";
import User from "../models/user.model.js";
import VerifyToken from "../models/verifyToken.model.js";
import { hashPassword, comparePassword } from "../utils/hashPassword.util.js";
import { generateToken, generateRefreshToken, generateEmailVerifyToken } from "../utils/token.util.js";
import { publishEvent } from "../../../events/eventPublisher.js";
import authNames from "../../../events/eventNames/authNames.js";


export class AuthService {
    static async signup(name, email, password) {
        if (!name || !email || !password) {
            return {
                success: false,
                message: 'Name, email, and password are required.',
            };
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw new AppError('Email is already registered.', STATUS.CONFLICT);
        }

        const passwordHashed = await hashPassword(password);

        const newUser = await User.create({
            name,
            email,
            password: passwordHashed
        });

        const token = await generateEmailVerifyToken(newUser);

        await VerifyToken.create({
            userId: newUser.id,
            token: token,
            expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000),
        });

        const verifyLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

        publishEvent(authNames.USER_SIGNUP, {
            name: newUser.name,
            email: newUser.email,
            verifyLink: verifyLink
        });

        return {
            success: true,
            message: 'User registered successfully.',
            data: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
            },
        };
    };

    static async login(email, password) {
        if (!email || !password) {
            return {
                success: false,
                message: 'Email and password are required.',
            };
        }

        const user = await User.findOne({ where: { email } });
        if (!user || !user.isVerified) {
            return {
                success: false,
                message: 'Invalid credentials or user not verified.',
            };
        }

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return {
                success: false,
                message: 'Invalid email or password.',
            };
        }

        const accessToken = generateToken({ 
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role, 
            profilePic: user.profilePic
        });
        const refreshToken = generateRefreshToken({ 
            id: user.id,
            name: user.name, 
            email: user.email,
            role: user.role,
            profilePic: user.profilePic
        });

        await user.update({ refreshToken });

        return {
            success: true,
            message: 'Login successful.',
            data: {
                accessToken,
                refreshToken,
            },
        };
    };
};

