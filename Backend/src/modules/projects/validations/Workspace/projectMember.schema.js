import joi from "joi";

export const projectMemberInviteSchema = joi.object({
    email: joi.string().email().required().messages({
        'string.base': 'Email must be a string',
        'string.email': 'Email must be a valid email address',
        'any.required': 'Email is required'
    })
});