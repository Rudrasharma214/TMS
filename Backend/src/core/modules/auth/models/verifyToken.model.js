import { sequelize } from "../../../../config/db.js";
import { DataTypes } from "sequelize";

const VerifyToken = sequelize.define(
    'VerifyToken',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        token: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        type: {
            type: DataTypes.ENUM('email_verification', 'password_reset'),
            allowNull: false,
        },

        expires_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        tableName: 'verify_tokens',
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        indexes: [
            { fields: ['user_id'] },
            { fields: ['created_at'] },
        ],
    }
);

export default VerifyToken;