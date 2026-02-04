import Subscription from "./subscription.model.js";
import Plan from "../../plan/models/plan.model.js";
import Payment from "../../payment/models/payment.model.js";
import User from "../../auth/models/user.model.js";

export class SubscriptionAssociations {
    static associate() {
        // Subscription belongs to User
        Subscription.belongsTo(User, {
            foreignKey: 'user_id',
            as: 'user',
        });

        // Subscription belongs to Plan
        Subscription.belongsTo(Plan, {
            foreignKey: 'plan_id',
            as: 'plan',
        });

        // Subscription has many Payments
        Subscription.hasMany(Payment, {
            foreignKey: 'subscription_id',
            as: 'payments',
        });
    }
};