import { emailLayout } from "../../../config/emailTemplate.js";

export const sendForgotPasswordEmailTemplate = (name, resetLink) => {
  const body = `
<tr>
<td align="center">
  <h1 style="
    margin:0;
    font-family:Arial,Helvetica,sans-serif;
    font-size:26px;
    font-weight:bold;
    color:#111111;">
    Reset Your Password
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
    We received a request to reset your account password.
    Click the button below to create a new password.
  </p>
</td>
</tr>

<tr><td height="30"></td></tr>

<tr>
<td align="center">
  <a href="${resetLink}"
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
    Reset Password
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
    color:#888888;
    line-height:18px;">
    If the button does not work, copy and paste this link into your browser:
  </p>

  <p style="
    word-break:break-all;
    font-family:Arial,Helvetica,sans-serif;
    font-size:12px;
    color:#f6a545;">
    ${resetLink}
  </p>
</td>
</tr>

<tr><td height="30"></td></tr>

<tr>
<td align="center" style="padding:0 40px;">
  <p style="
    margin:0;
    font-family:Arial,Helvetica,sans-serif;
    font-size:12px;
    color:#777777;
    line-height:18px;">
    This password reset link is valid for a limited time.
    If you did not request a password reset, please ignore this email.
  </p>
</td>
</tr>
`;

  return emailLayout({
    title: "Reset Your Password",
    body
  });
};

export const sendPasswordResetSuccessEmailTemplate = (name) => {
  const body = `
<tr>
<td align="center">
  <h1 style="
    margin:0;
    font-family:Arial,Helvetica,sans-serif;
    font-size:26px;
    font-weight:bold;
    color:#111111;">
    Password Updated Successfully
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
    Your password has been successfully updated.
    You can now sign in using your new password.
  </p>
</td>
</tr>

<tr><td height="30"></td></tr>

<tr>
<td align="center" style="padding:0 40px;">
  <p style="
    margin:0;
    font-family:Arial,Helvetica,sans-serif;
    font-size:12px;
    color:#777777;
    line-height:18px;">
    If you did not perform this action, please reset your password immediately
    and contact our support team.
  </p>
</td>
</tr>

<tr><td height="30"></td></tr>

<tr>
<td align="center" style="padding:0 40px;">
  <p style="
    margin:0;
    font-family:Arial,Helvetica,sans-serif;
    font-size:12px;
    color:#999999;
    line-height:18px;">
    This is a security notification sent to protect your account.
  </p>
</td>
</tr>
`;

  return emailLayout({
    title: "Password Updated",
    body
  });
};
