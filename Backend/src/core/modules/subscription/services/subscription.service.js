import { STATUS } from "../../../constants/statusCodes.js";
import Subscription from "../models/subscription.model.js";

export class SubscriptionService {
    /* Create Subscription */
    async createSubscription(user_id, subscriptionData) {
        try {
           const newSubscription = await Subscription.create({
                user_id,
                plan_id: subscriptionData.plan_id,
                start_date: subscriptionData.start_date,
                end_date: subscriptionData.end_date,
                billing_cycle: subscriptionData.billing_cycle,
                auto_renew: subscriptionData.auto_renew,
                renewed_at: subscriptionData.renewed_at,
                status: 'inactive',
            });

            return {
                success: true,
                data: newSubscription,
            };

        } catch (error) {
            return {
                success: false,
                message: "Error creating subscription",
                error: error.message,
                statusCode: STATUS.INTERNAL_ERROR,
            }
        }
    };
};