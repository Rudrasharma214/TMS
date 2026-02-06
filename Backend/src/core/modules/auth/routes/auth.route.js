import express from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { AuthService } from "../services/auth.service.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../../../middlewares/validate.middleware.js";
import { 
    changePasswordSchema,
    forgotPasswordSchema,
    loginSchema, 
    registerSchema, 
    resetPasswordSchema, 
    verifyEmailSchema,
    verifyLoginOTPschema
} from "../validations/user.schema.js";

const authRouter = express.Router();


const authService = new AuthService();
const authController = new AuthController(authService);

/**
 * @route POST /auth/signup
 * @desc User signup
 * @access Public
 */
authRouter.post(
    "/signup", 
    validate(registerSchema),
    authController.signup
);

/** 
 * @route POST /auth/verify-email
 * @desc Verify user email
 * @access Public
 */
authRouter.post(
    "/verify-email", 
    validate(verifyEmailSchema),
    authController.verifyEmail
);

/**
 * @route POST /auth/login
 * @desc User login
 * @access Public
 */
authRouter.post(
    "/login", 
    validate(loginSchema),
    authController.login
);

/**
 * @route POST /auth/verify-login
 * @desc User login
 * @access Public
 */
authRouter.post(
    "/verify-login", 
    validate(verifyLoginOTPschema),
    authController.verifyLoginOTP
)

/** 
 * @route POST /auth/forgot-password
 * @desc Forgot password
 * @access Public
 */
authRouter.post(
    "/forgot-password",
    validate(forgotPasswordSchema),
    authController.forgotPassword
);

/**
 * @route POST /auth/reset-password
 * @desc Reset user password
 * @access Public
 */
authRouter.post(
    "/reset-password", 
    validate(resetPasswordSchema),
    authController.resetPassword
);

/**
 * @route POST /auth/change-password
 * @desc Change user password
 * @access Private
 */
authRouter.post(
    "/change-password", 
    authenticate, 
    validate(changePasswordSchema),
    authController.changePassword
);

/** 
 * @route POST /auth/refresh-token
 * @desc Refresh access token
 * @access Private
 */
authRouter.post(
    "/refresh-token",
    authController.refreshToken
);

/** 
 * @route POST /auth/logout
 * @desc User logout
 * @access Private
 */
authRouter.post(
    "/logout", 
    authenticate, 
    authController.logout
);

export default authRouter;
