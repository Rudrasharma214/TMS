import jwt from 'jsonwebtoken';
import env from '../../../config/env.js';
import AppError from '../../../core/utils/AppError.js';
import { STATUS } from '../../../core/constants/statusCodes.js';

export const generateInviteToken = (projectId, email) => {
    const payload = {
        projectId,
        email,
        type: 'project_invitation'
    };

    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: '7d' });
};

export const verifyInviteToken = (token) => {
    try {
        if(!token) {
            throw new AppError('Token is required', STATUS.BAD_REQUEST);
        }

        const decoded = jwt.verify(token, env.JWT_SECRET);
        
        if (decoded.type !== 'project_invitation') {
            throw new AppError('Invalid token type', STATUS.BAD_REQUEST);
        }

        return decoded;
    } catch (error) {
        throw new AppError('Invalid or expired token', STATUS.BAD_REQUEST);
    }
};