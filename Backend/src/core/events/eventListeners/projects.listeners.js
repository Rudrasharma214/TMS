import { sendEmail } from "../../../config/sendMail.js";
import eventBus from "../eventBus.events.js";

eventBus.on('project.invite_member', async (data) => {
    const { token,
        email,
        projectName,
        userName,
        invitedUserName 
    } = data;

    const inviteLink = `${process.env.FRONTEND_URL}/project-invite?token=${token}`;

    await sendEmail({
        to: email,
        subject: `Invitation to join project: ${projectName}`,
        html: `
            <p>Hi ${invitedUserName || email},</p>
            <p>${userName} has invited you to join the project "${projectName}".</p>
            <p>Click the link below to accept the invitation:</p>
            <a href="${inviteLink}">Accept Invitation</a>
            <p>If you did not expect this invitation, you can ignore this email.</p>    
        `
    });
});