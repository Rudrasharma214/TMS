import { STATUS } from "../../../constants/statusCodes.js";
import { sendResponse, sendErrorResponse } from "../../../utils/response.js";
import env from "../../../../config/env.js";

export class AuthController {
  constructor(authService) {
    this.authService = authService;
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.verifyEmail = this.verifyEmail.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
  }

  async signup(req, res, next) {
    try {
      const { name, email, password } = req.body;

      const result = await this.authService.signup(name, email, password);

      if (!result.success) {
        return sendErrorResponse(res, result.message, STATUS.BAD_REQUEST);
      }

      sendResponse(res, STATUS.CREATED, result.message, result.data);
    } catch (error) {
      next(error);
    }
  }

  async verifyEmail(req, res, next) {
    try {
      const { token } = req.body;

      const result = await this.authService.verifyEmail(token);

      if (!result.success) {
        return sendErrorResponse(res, result.message, STATUS.BAD_REQUEST);
      }

      res.cookie("refreshToken", result.data.refreshToken, {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 15 * 24 * 60 * 60 * 1000,
      });

      sendResponse(res, STATUS.OK, result.message, result.data.accessToken);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const result = await this.authService.login(email, password);

      if (!result.success) {
        return sendErrorResponse(res, result.message, STATUS.BAD_REQUEST);
      }

      res.cookie("refreshToken", result.data.refreshToken, {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 15 * 24 * 60 * 60 * 1000,
      });

      sendResponse(res, STATUS.OK, result.message, result.data.accessToken);
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;

      const result = await this.authService.forgotPassword(email);

      if (!result.success) {
        return sendErrorResponse(res, result.message, STATUS.BAD_REQUEST);
      }

      sendResponse(res, STATUS.OK, result.message);
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(req, res, next) {
    try {
      const { token, password } = req.body;

      const result = await this.authService.resetPassword(token, password);

      if (!result.success) {
        return sendErrorResponse(res, result.message, STATUS.BAD_REQUEST);
      }

      sendResponse(res, STATUS.OK, result.message);
    } catch (error) {
      next(error);
    }
  }
}
