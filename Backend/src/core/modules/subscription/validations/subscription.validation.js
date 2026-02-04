import joi from "joi";

export const subscriptionSchema = joi.object({
    plan_id: joi.number().required(),
    start_date: joi.date().required(),
    end_date: joi.date().required(),
    billing_cycle: joi.string().valid('monthly', 'yearly').required(),
    auto_renew: joi.boolean().required(),
    renewed_at: joi.date().allow(null),
});