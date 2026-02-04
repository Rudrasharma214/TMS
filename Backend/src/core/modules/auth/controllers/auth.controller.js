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
    this.changePassword = this.changePassword.bind(this);
    this.refreshToken = this.refreshToken.bind(this);
    this.logout = this.logout.bind(this);
  }

  /* Signup */
  async signup(req, res, next) {
    try {
      const { name, email, password } = req.body;

      const result = await this.authService.signup(name, email, password);

      if (!result.success) {
        return sendErrorResponse(res, result.statusCode, result.message, result.error);
      }

      sendResponse(res, STATUS.CREATED, result.message, result.data);
    } catch (error) {
      next(error);
    }
  }

  /* VerifyEmail */
  async verifyEmail(req, res, next) {
    try {
      const { token } = req.body;

      const result = await this.authService.verifyEmail(token);

      if (!result.success) {
        return sendErrorResponse(res, result.statusCode, result.message, result.error);
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

  /* Login */
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const result = await this.authService.login(email, password);

      if (!result.success) {
        return sendErrorResponse(res, result.statusCode, result.message, result.error);
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

  /* ForgotPassword */
  async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;

      const result = await this.authService.forgotPassword(email);

      if (!result.success) {
        return sendErrorResponse(res, result.statusCode, result.message);
      }

      sendResponse(res, STATUS.OK, result.message);
    } catch (error) {
      next(error);
    }
  }

  /* ResetPassword */
  async resetPassword(req, res, next) {
    try {
      const { token, password } = req.body;

      const result = await this.authService.resetPassword(token, password);

      if (!result.success) {
        return sendErrorResponse(res, result.statusCode, result.message, result.error);
      }

      sendResponse(res, STATUS.OK, result.message);
    } catch (error) {
      next(error);
    }
  }

  /* ChangePassword */
  async changePassword(req, res, next) {
    try {
      const { id: userId } = req.user;
      const { oldPassword, newPassword } = req.body;

      if(oldPassword === newPassword) {
        return sendErrorResponse(res, STATUS.BAD_REQUEST, "New password must be different from old password.");
      }

      const result = await this.authService.changePassword(userId, oldPassword, newPassword);

      if (!result.success) {
        return sendErrorResponse(res, result.statusCode, result.message, result.error);
      }

      sendResponse(res, STATUS.OK, result.message);
    } catch (error) {
      next(error);
    }
  };

  /* RefreshToken */
  async refreshToken(req, res, next) {
    try {
      const userId = req.user.id;
      const token = req.cookies.refreshToken;

      const result = await this.authService.refreshToken(userId, token);

      if (!result.success) {
        return sendErrorResponse(res, result.statusCode, result.message, result.error);
      }

      sendResponse(res, STATUS.OK, result.message, result.data.accessToken);
    } catch (error) {
      next(error);
    }
  };

  /* Logout */
  async logout(req, res, next) {
    try {
      const userId = req.user.id;

      const result = await this.authService.logout(userId);

      if (!result.success) {
        return sendErrorResponse(res, result.statusCode, result.message, result.error);
      }

      res.clearCookie("refreshToken");

      sendResponse(res, STATUS.OK, result.message);
    } catch (error) {
      next(error);
    }
  };
}
