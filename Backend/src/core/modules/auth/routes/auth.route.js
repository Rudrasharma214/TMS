import express from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { AuthService } from "../services/auth.service.js";
import { authenticate } from "../middlewares/auth.middleware.js";
const authRouter = express.Router();


const authService = new AuthService();
const authController = new AuthController(authService);

/**
 * @route POST /auth/signup
 * @desc User signup
 * @access Public
 */
authRouter.post("/signup", authController.signup);

/**
 * @route POST /auth/login
 * @desc User login
 * @access Public
 */
authRouter.post("/login", authController.login);

/** 
 * @route POST /auth/verify-email
 * @desc Verify user email
 * @access Public
 */
authRouter.post("/verify-email", authController.verifyEmail);

/** 
 * @route POST /auth/forgot-password
 * @desc Forgot password
 * @access Public
 */
authRouter.post("/forgot-password", authController.forgotPassword);

/**
 * @route POST /auth/reset-password
 * @desc Reset user password
 * @access Public
 */
authRouter.post("/reset-password", authController.resetPassword);

/**
 * @route POST /auth/change-password
 * @desc Change user password
 * @access Private
 */
authRouter.post("/change-password", authenticate, authController.changePassword);

/** 
 * @route POST /auth/refresh-token
 * @desc Refresh access token
 * @access Private
 */
authRouter.post("/refresh-token", authenticate, authController.refreshToken);

/** 
 * @route POST /auth/logout
 * @desc User logout
 * @access Private
 */
authRouter.post("/logout", authenticate, authController.logout);

export default authRouter;
