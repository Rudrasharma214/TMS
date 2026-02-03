import { emailLayout } from "../../../config/emailTemplate.js";

export const sendWelcomeEmailTemplate = (name) => {
  const body = `
<tr>
<td align="center">
  <h1 style="
    margin:0;
    font-family:Arial,Helvetica,sans-serif;
    font-size:26px;
    font-weight:bold;
    color:#111111;">
    Welcome Aboard!
  </h1>
</td>
</tr>

<tr><td height="20"></td></tr>

<tr>
<td align="center">
  <p style="
    font-family:Arial,Helvetica,sans-serif;
    font-size:14px;
    color:#333333;">
    Hi <strong>${name}</strong>,
  </p>
</td>
</tr>

<tr><td height="25"></td></tr>

<tr>
<td align="center" style="padding:0 40px;">
  <p style="
    margin:0;
    font-family:Arial,Helvetica,sans-serif;
    font-size:14px;
    color:#555555;
    line-height:22px;">
    Welcome to <strong>Your Company</strong>!  
    Your account has been successfully created, and you’re all set to get started.
  </p>
</td>
</tr>

<tr><td height="30"></td></tr>

<!-- OPTIONAL CTA -->
<tr>
<td align="center">
  <a href="{{DASHBOARD_LINK}}"
     style="
       display:inline-block;
       padding:12px 26px;
       background:#f6a545;
       border-radius:4px;
       font-family:Arial,Helvetica,sans-serif;
       font-size:14px;
       color:#ffffff;
       text-decoration:none;
       font-weight:bold;">
    Go to Dashboard
  </a>
</td>
</tr>

<tr><td height="35"></td></tr>

<tr>
<td align="center" style="padding:0 40px;">
  <p style="
    margin:0;
    font-family:Arial,Helvetica,sans-serif;
    font-size:12px;
    color:#777777;
    line-height:18px;">
    If you have any questions, feel free to reply to this email — we’re happy to help.
  </p>
</td>
</tr>
`;

  return emailLayout({
    title: "Welcome",
    body
  });
};
