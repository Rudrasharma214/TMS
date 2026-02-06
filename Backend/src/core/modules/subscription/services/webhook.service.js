import Payment from "../models/payment.model.js";
import Subscription from "../models/subscription.model.js";
import { publishEvent } from "../../../events/eventPublisher.js";
import paymentNames from "../../../events/eventNames/paymentNames.js";
import { PaymentRepository } from "../repositories/payment.repositories.js";

const paymentRepository = new PaymentRepository();

/* Handle Payment Captured */
export const handlePaymentCaptured = async (paymentData, transaction) => {
    try {
        const payment = await paymentRepository.findOne({
            where: { gateway_order_id: paymentData.order_id },
            transaction
        });

        if (!payment) {
            return {
                success: false,
                message: "Payment not found",
                statusCode: STATUS.NOT_FOUND,
            };
        }

        await payment.update(
            {
                status: 'captured',
                gateway_payment_id: paymentData.id,
                payment_date: new Date(paymentData.created_at * 1000),
            },
            { transaction }
        );

        const subscription = await Subscription.findByPk(payment.subscription_id, { transaction });
        if (subscription) {
            await subscription.update(
                { status: 'active' },
                { transaction }
            );
        }

        publishEvent(paymentNames.PAYMENT_CAPTURED, {
            paymentId: payment.id,
            subscriptionId: payment.subscription_id,
            userId: payment.user_id,
            amount: payment.amount,
        });

        await transaction.commit();

        return {
            success: true,
            message: "Payment captured successfully",
            statusCode: STATUS.OK,
        };
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

/* Handle Payment Failed */
export const handlePaymentFailed = async (paymentData, transaction) => {
    try {
        const payment = await paymentRepository.findOne({
            where: { gateway_order_id: paymentData.order_id },
            transaction
        });

        if (!payment) {
            return {
                success: false,
                message: "Payment not found",
                statusCode: STATUS.NOT_FOUND,
            };
        }

        await payment.update(
            {
                status: 'failed',
                gateway_payment_id: paymentData.id,
            },
            { transaction }
        );

        publishEvent(paymentNames.PAYMENT_FAILED, {
            paymentId: payment.id,
            subscriptionId: payment.subscription_id,
            userId: payment.user_id,
            reason: paymentData.error_description || 'Payment failed',
        });

        await transaction.commit();

        return {
            success: true,
            message: "Payment failure recorded",
            statusCode: STATUS.OK,
        };
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};