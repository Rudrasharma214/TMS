import eventBus from "../eventBus.events.js";
import { sendEmail } from "../../../config/sendMail.js";
import { sendVerifyEmailTemplate } from "../../templates/authTemplates/verifyEmail.template.js";
import { sendWelcomeEmailTemplate } from "../../templates/authTemplates/welcomeEmail.template.js";
import { sendLoginOtpEmailTemplate } from "../../templates/authTemplates/loginOtpEmail.template.js";
import { 
    sendForgotPasswordEmailTemplate, 
    sendPasswordResetSuccessEmailTemplate 
} from "../../templates/authTemplates/forgotPasswordEmail.template.js";

eventBus.on('user_signup', async (payload) => {
    const { name, email, verifyLink } = payload;

    await sendEmail({
        to: email,
        subject: 'Verification Email for Your Account',
        html: sendVerifyEmailTemplate(name, verifyLink),
    })
});

eventBus.on('user_login', async (payload) => {
    const { name, email, otp } = payload;

    await sendEmail({
        to: email,
        subject: 'Your One-Time Password (OTP)',
        html: sendLoginOtpEmailTemplate(name, otp, '5 minutes'),
    });
});

eventBus.on('email_verification', async (payload) => {
    const { name, email } = payload;

    await sendEmail({
        to: email,
        subject: 'Email Verified Successfully',
        html: sendWelcomeEmailTemplate(name),
    })
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

