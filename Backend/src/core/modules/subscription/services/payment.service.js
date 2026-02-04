import Subscription from "../models/subscription.model.js";
import Plan from "../models/plan.model.js";
import Payment from "../models/payment.model.js";
import { STATUS } from "../../../constants/statusCodes.js";
import { createRazorpayOrder, verifyRazorpaySignature } from "../utils/payment.utils.js";
import { sequelize } from "../../../../config/db.js";
import { handlePaymentCaptured, handlePaymentFailed } from "./webhook.service.js";


export class PaymentService {
    /* Create Payment Order */
    async createPaymentOrder(userId, subscriptionId) {
        try {
            const subscription = await Subscription.findOne({
                where: { id: subscriptionId },
                include: [
                    {
                        model: Plan,
                        as: "plan",
                    }
                ],
            });
            if (!subscription) {
                return {
                    success: false,
                    message: "Subscription not found",
                    statusCode: STATUS.NOT_FOUND,
                }
            }

            const price = subscription.billing_cycle === 'monthly' ? subscription.plan.monthly_price : subscription.plan.yearly_price;

            const order = await createRazorpayOrder(
                price,
                "INR",
                `receipt_${userId}_${subscriptionId}_${Date.now()}`
            );

            const payment = await Payment.create({
                subscription_id: subscriptionId,
                user_id: userId,
                amount: order.amount / 100,
                payment_date: new Date(),
                payment_method: 'Razorpay',
                gateway_order_id: order.id,
                currency: order.currency,
                status: order.status,
            });

            return {
                success: true,
                message: "Payment order created successfully",
                data: payment,
            };
        } catch (error) {
            return {
                success: false,
                message: "Error creating payment order",
                error: error.message,
                statusCode: STATUS.INTERNAL_ERROR,
            }
        }
    };

    /* Handle Razorpay Webhook */
    async handlePaymentWebhook(webhookBody, signature) {
        const transaction = await sequelize.transaction();

        try {
            const isValidSignature = verifyRazorpaySignature(webhookBody, signature);
            if (!isValidSignature) {
                return {
                    success: false,
                    message: "Invalid webhook signature",
                    statusCode: STATUS.UNAUTHORIZED,
                };
            }

            const event = JSON.parse(webhookBody);
            const eventType = event.event;

            switch (eventType) {
                case 'payment.failed':
                    return await handlePaymentFailed(event.payload.payment.entity, transaction);

                case 'payment.captured':
                    return await handlePaymentCaptured(event.payload.payment.entity, transaction);

                default:
                    await transaction.commit();
                    return {
                        success: true,
                        message: `Webhook event ${eventType} received`,
                        statusCode: STATUS.OK,
                    };
            }
        } catch (error) {
            await transaction.rollback();
            return {
                success: false,
                message: "Error processing webhook",
                error: error.message,
                statusCode: STATUS.INTERNAL_ERROR,
            };
        }
    }
};