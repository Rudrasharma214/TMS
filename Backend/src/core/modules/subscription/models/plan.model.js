import { sequelize } from "../../../../config/db.js";
import { DataTypes } from "sequelize";

const Plan = sequelize.define(
    'Plan',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        monthly_price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },

        yearly_price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },

        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },
    {
        tableName: 'plans',
        paranoid: true,
        indexes: [
            { fields: ['name'] },
            { fields: ['is_active'] },
        ],
    }
);

export default Plan;