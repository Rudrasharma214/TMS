import { STATUS } from "../../../constants/statusCodes.js";
import AppError from "../../../utils/AppError.js";
import User from "../models/user.model.js";
import { hashPassword } from "../utils/hashPassword.js";


export class AuthService {
    static async signup (name, email, password) {
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

        return {
            success: true,
            message: 'User registered successfully.',
            data: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
            },
        };
    }
};

