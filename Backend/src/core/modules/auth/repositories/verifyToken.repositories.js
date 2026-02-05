import VerifyToken from "../models/verifyToken.model.js";

export class VerifyTokenRepository {

    /* Create new verify token */
    async createToken(userId, token, expiresAt, type) {
        return await VerifyToken.create({ user_id: userId, token, expiresAt, type });
    }

    /* Find verify token by user ID and token */
    async findByUserIdAndType(userId, type) {
        return await VerifyToken.findOne({ where: { user_id: userId, type } });
    }

    /* Delete verify token by ID */
    async deleteTokenById(tokenId) {
        return await VerifyToken.destroy({ where: { id: tokenId } });
    }
    
};