import { sequelize } from "../../../../config/db.js";
import { DataTypes } from "sequelize";

const Subscription = sequelize.define(
    'Subscription',
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

        plan_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        start_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },

        end_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },

        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },

        cancelled_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },

        auto_renew: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },

        renewed_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },

        billing_cycle: {
            type: DataTypes.ENUM('monthly', 'yearly'),
            allowNull: false,
        },

        status: {
            type: DataTypes.ENUM('active', 'inactive', 'cancelled', 'expired', 'paused'),
            allowNull: false,
            defaultValue: 'inactive',
        }
    },
    {
        tableName: 'subscriptions',
        paranoid: true,
        indexes: [
            { fields: ['user_id'] },
            { fields: ['plan_id'] },
            { fields: ['is_active'] },
            { fields: ['created_at'] },
        ],
    }
);

export default Subscription;