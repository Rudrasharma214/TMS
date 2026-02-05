import joi from 'joi';

export const createPlanSchema = joi.object({
    name: joi.string().min(3).max(100).required(),
    description: joi.string().max(500).optional(),
    monthly_price: joi.number().precision(2).min(0).required(),
    yearly_price: joi.number().precision(2).min(0).required(),
});

export const updatePlanSchema = joi.object({
    name: joi.string().min(3).max(100).optional(),
    description: joi.string().max(500).optional(),
    monthly_price: joi.number().precision(2).min(0).optional(),
    yearly_price: joi.number().precision(2).min(0).optional(),
    is_active: joi.boolean().optional(),
});
