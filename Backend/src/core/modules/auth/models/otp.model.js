import { DataTypes } from 'sequelize';
import { sequelize } from '../../../../config/db.js';

const OTP = sequelize.define(
    'OTP',
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
            references: {
                model: "users",
                key: "id",
            },
            onDelete: "CASCADE",
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    },
    {
        tableName: 'otps',
        paranoid: true,
        indexes: [
            { fields: ['user_id'] },
            { fields: ['created_at'] },
        ],
    }
);

export default OTP;