import { STATUS } from "../../../constants/statusCodes.js";
import { sendErrorResponse } from "../../../utils/response.js";
import { verifyToken } from "../utils/token.util.js";

export const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return sendErrorResponse(res, STATUS.UNAUTHORIZED, "Invalid or expired token.");
        }

        const decoded = verifyToken(token);

        req.user = decoded;
        next();
    } catch (error) {
        return sendErrorResponse(res, STATUS.UNAUTHORIZED, "Invalid or expired token.");
    }
};
