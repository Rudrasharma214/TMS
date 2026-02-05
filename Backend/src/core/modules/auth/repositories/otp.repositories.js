import OTP from "../models/otp.model.js";

export class OtpRepository {
    
    /* Create new OTP */
    async createOtp(userId, code, expiresAt) {
        return await OTP.create({ user_id: userId, code, expiresAt });
    }

    /* Find OTP by user ID and code */
    async findByUserIdAndCode(userId, code) {
        return await OTP.findOne({ where: { user_id: userId, code } });
    }

    /* Delete OTP by ID */
    async deleteOtpById(otpId) {
        return await OTP.destroy({ where: { id: otpId } });
    }

};