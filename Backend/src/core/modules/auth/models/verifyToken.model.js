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

        userId: {
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

        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },

        is_used: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },

        usedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        }
    },
    {
        tableName: 'verify_tokens',
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        indexes: [
            { fields: ['created_at'] },
        ],
    }
);

export default VerifyToken;