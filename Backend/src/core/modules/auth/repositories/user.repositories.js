import User from '../models/user.model.js';

export class UserRepository {

    /* Find user by email */
    async findByEmail(email) {
        return await User.findOne({ where: { email } });
    }

    /* Create new user */
    async createUser(userData) {
        return await User.create(userData);
    }

    /* Find user by ID */
    async findById(userId) {
        return await User.findByPk(userId);
    }
    
};
