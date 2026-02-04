import joi from "joi";

export const registerSchema = joi.object({
    name: joi.string().min(3).max(30).required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
});

export const verifyEmailSchema = joi.object({
    token: joi.string().required(),
});

export const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
});

export const verifyLoginOTPschema = joi.object({
    userId: joi.number().integer().required(),
    otp: joi.string().length(6).required(),
});

export const forgotPasswordSchema = joi.object({
    email: joi.string().email().required(),
});

export const resetPasswordSchema = joi.object({
    token: joi.string().required(),
    password: joi.string().min(8).required(),
});

export const changePasswordSchema = joi.object({
    oldPassword: joi.string().required(),
    newPassword: joi.string().min(8).required(),
});

