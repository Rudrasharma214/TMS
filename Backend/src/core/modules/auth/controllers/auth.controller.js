


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

}