import { STATUS } from "../../../constants/statusCodes.js";
import Subscription from "../models/subscription.model.js";
import Plan from "../models/plan.model.js";
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
                message: "Subscription created successfully",
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

    /* Get My Subscription */
    async getMySubscription(user_id) {
        try {
            const subscription = await Subscription.findOne({
                where: { user_id },
                attributes: [
                    'id',
                    'plan_id',
                    'start_date',
                    'end_date',
                    'is_active',
                    'cancelled_at',
                    'auto_renew',
                    'renewed_at',
                    'billing_cycle',
                    'status',
                ],
                include: [
                    {
                        model: Plan,
                        as: 'plan',
                        attributes: [
                            'name',
                            'description',
                        ],
                    }
                ]
            });

            if (!subscription) {
                return {
                    success: false,
                    message: "No subscription found for this user",
                    statusCode: STATUS.NOT_FOUND,
                };
            }

            return {
                success: true,
                message: "Subscription retrieved successfully",
                data: subscription,
            };

        } catch (error) {
            return {
                success: false,
                message: "Error retrieving subscription",
                error: error.message,
                statusCode: STATUS.INTERNAL_ERROR,
            }
        }
    };
};