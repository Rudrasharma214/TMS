import eventBus from "../eventBus.events";
import { sendEmail } from "../../../config/sendMail.js";
import { sendVerifyEmailTemplate } from "../../templates/authTemplates/verifyEmail.template.js";
import { sendPasswordResetSuccessEmailTemplate } from "../../templates/authTemplates/forgotPasswordEmail.template.js";

eventBus.on('user_signup', async (payload) => {
    const { name, email, verifyLink } = payload;

    await sendEmail({
        to: email,
        subject: 'Verification Email for Your Account',
        html: sendVerifyEmailTemplate(name, verifyLink),
    })
});

eventBus.on('user_login', async (payload) => {
    // Handle user login event
    // login otp
});

eventBus.on('email_verification', async (payload) => {
    // Handle email verification event
    // welcome email
});

eventBus.on('reset_password', async (payload) => {
    const { name, email, resetLink } = payload;

    await sendEmail({
        to: email,
        subject: 'Password Reset Request',
        html: sendForgotPasswordEmailTemplate(name, resetLink),
    })
});

eventBus.on('successful_password_reset', async (payload) => {
    const { name, email } = payload;

    await sendEmail({
        to: email,
        subject: 'Password Reset Successful',
        html: sendPasswordResetSuccessEmailTemplate(name),
    })
});

