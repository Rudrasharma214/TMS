import eventBus from "../eventBus.events";
import { sendEmail } from "../../../config/sendMail.js";
import { sendVerifyEmailTemplate } from "../../templates/authTemplates/verifyEmail.template.js";

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
    // Handle reset password event
    // send reset password email
});

eventBus.on('successful_password_reset', async (payload) => {
    // Handle successful password reset event
    // send confirmation email
});

