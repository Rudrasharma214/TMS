


import { STATUS } from "../../../constants/statusCodes.js";
import { AuthService } from "../services/auth.service.js";
import { sendResponse, sendErrorResponse } from "../../../utils/response.js";

export class AuthController {
    static async signup(req, res, next) {
        try {
            const { name, email, password } = req.body;

            const result = await AuthService.signup(name, email, password);

            if (!result.success) {
                sendErrorResponse(res, result.message, STATUS.BAD_REQUEST);
                return;
            }

            sendResponse(res, STATUS.CREATED, result.message, result.data);
        } catch (error) {
            next(error);
        }
    };
    
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;

            const result = await AuthService.login(email, password);

            if (!result.success) {
                sendErrorResponse(res, result.message, STATUS.BAD_REQUEST);
                return;
            }

            res.cookie('refreshToken', result.data.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
                maxAge: 15 * 24 * 60 * 60 * 1000,
            });

            sendResponse(res, STATUS.OK, result.message, result.data.accessToken);
        } catch (error) {
            next(error);
        }
    };

    static async verifyEmail(req, res, next) {
        try {
            const { token } = req.body;

            const result = await AuthService.verifyEmail(token);

            if (!result.success) {
                sendErrorResponse(res, result.message, STATUS.BAD_REQUEST);
                return;
            }

            sendResponse(res, STATUS.OK, result.message);
        } catch (error) {
            next(error);
        }
    }
}