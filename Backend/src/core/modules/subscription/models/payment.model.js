import { sequelize } from "../../../../config/db.js";
import { DataTypes } from "sequelize";

const Payment = sequelize.define(
    'Payment',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        subscription_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        plan_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },

        payment_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },

        payment_method: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        gateway_order_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        gateway_payment_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        gateway_signature: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        currency: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'INR',
        },

        refund_reason: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        status: {
            type: DataTypes.ENUM('pending', 'captured', 'completed', 'failed', 'refunded'),
            allowNull: false,
            defaultValue: 'pending',
        },

        invoice_number: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        invoice_url: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        tableName: 'payments',
        paranoid: true,
        indexes: [
        ],
    }
);

export default Payment;