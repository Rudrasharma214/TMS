import VerifyToken from "../models/verifyToken.model.js";

export class VerifyTokenRepository {

    /* Create new verify token */
    async createToken({userId, token, expiresAt, type, transaction = null}) {
        return await VerifyToken.create({
            user_id: userId,
            token,
            expires_at: expiresAt,
            type
        }, {
            transaction
        });
    }

    /* Find verify token by user ID and token */
    async findByUserIdAndType(userId, type, transaction = null) {
        return await VerifyToken.findOne({
            where: {
                user_id: userId,
                type
            }, transaction
        });
    }

    /* Delete verify token by ID */
    async deleteTokenById(tokenId, transaction = null) {
        return await VerifyToken.destroy({
            where: {
                id: tokenId
            }, transaction
        });
    }

};