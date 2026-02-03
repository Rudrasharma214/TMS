import SibApiV3Sdk from 'sib-api-v3-sdk';
import env from './env.js';
import logger from './logger.js';

export const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    const apiKey = defaultClient.authentications["api-key"];
    apiKey.apiKey = env.BREVO_API_KEY || "";

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    const senderEmail = env.BREVO_FROM_EMAIL;

    const sendSmtpEmail = {
      sender: { email: senderEmail },
      to: [{ email: to }],
      subject,
      htmlContent: html,
      textContent: text,
    };

    const resp = await apiInstance.sendTransacEmail(sendSmtpEmail);

    // Log email details
    logger.info('Email sent successfully', {
      to,
      subject,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    const err = new Error(
      `Failed to send email via Brevo: ${error && error.message ? error.message : error}`
    );
    err.cause = error;

    // Log email failure details
    logger.error('Failed to send email', {
      to,
      subject,
      error: error.message,
      timestamp: new Date().toISOString(),
    });

    throw err;
  }
};