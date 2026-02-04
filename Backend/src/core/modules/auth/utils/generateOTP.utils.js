import OTP from "../models/otp.model.js";
import { STATUS } from "../../../constants/statusCodes.js";

export const generateOTP = async (user_id) => {
    try {
        const otps = await OTP.findAll({
            where: { user_id },
            order: [['createdAt', 'DESC']],
        });

        const now = new Date();
        const count = otps.length;

        if (count === 0) {
            return await generateNewOTP(user_id);
        }

        const mostRecentOtp = otps[0];
        const timeSinceLastOtp = (now - new Date(mostRecentOtp.createdAt)) / (1000 * 60);

        if (count === 1) {
            if (timeSinceLastOtp >= 2) {
                return await generateNewOTP(user_id);
            } else {
                return {
                    success: false,
                    message: `Please wait ${Math.ceil(2 - timeSinceLastOtp)} minute(s) before requesting a new OTP.`,
                    statusCode: STATUS.TOO_MANY_REQUESTS,
                };
            }
        }

        if (count === 2) {
            if (timeSinceLastOtp >= 10) {
                return await generateNewOTP(user_id);
            } else {
                return {
                    success: false,
                    message: `Please wait ${Math.ceil(10 - timeSinceLastOtp)} minute(s) before requesting a new OTP.`,
                    statusCode: STATUS.TOO_MANY_REQUESTS,
                };
            }
        }

        if (count === 3) {
            if (timeSinceLastOtp >= 30) {
                return await generateNewOTP(user_id);
            } else {
                return {
                    success: false,
                    message: `Please wait ${Math.ceil(30 - timeSinceLastOtp)} minute(s) before requesting a new OTP.`,
                    statusCode: STATUS.TOO_MANY_REQUESTS,
                };
            }
        }

        if (count >= 4) {
            const thirdOtp = otps[2];
            const timeSinceThirdOtp = (now - new Date(thirdOtp.createdAt)) / (1000 * 60);

            if (timeSinceThirdOtp >= 60) {
                return await generateNewOTP(user_id);
            } else {
                return {
                    success: false,
                    message: `Too many OTP requests. Please try again in ${Math.ceil(60 - timeSinceThirdOtp)} minute(s).`,
                    statusCode: STATUS.TOO_MANY_REQUESTS,
                };
            }
        }
    } catch (error) {
        return {
            success: false,
            message: "Error generating OTP",
            error: error.message,
            statusCode: STATUS.INTERNAL_ERROR,
        };
    }
};

const generateNewOTP = async (user_id) => {
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await OTP.create({
        user_id,
        code: otpCode,
        expiresAt,
    });

    return {
        success: true,
        message: "OTP generated successfully",
        data: { otp: otpCode, expiresAt },
        statusCode: STATUS.OK,
    };
};