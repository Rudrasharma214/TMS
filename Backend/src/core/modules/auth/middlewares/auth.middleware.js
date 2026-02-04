import { STATUS } from "../../../constants/statusCodes.js";
import { sendErrorResponse } from "../../../utils/response.js";
import { verifyToken } from "../utils/token.util.js";

/**
 * Middleware to authenticate users based on JWT token.
 */
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

/**
 * Middleware to authenticate admin user based on JWT token.
 */
export const adminAuthenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return sendErrorResponse(res, STATUS.UNAUTHORIZED, "Invalid or expired token.");
        }   

        const decoded = verifyToken(token);

        if (decoded.role !== 'admin') {
            return sendErrorResponse(res, STATUS.FORBIDDEN, "Access denied. Admins only.");
        }
        req.user = decoded;
        next();
    } catch (error) {
        return sendErrorResponse(res, STATUS.UNAUTHORIZED, "Invalid or expired token.");
    }
};