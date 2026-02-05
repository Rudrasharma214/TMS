import { emailLayout } from "../../../config/emailTemplate.js";


export const sendForgotPasswordEmailTemplate = (name, resetLink) => {
  const body = `

<!-- ================= TITLE ================= -->
<tr>
<td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="table-layout:fixed;">
<tr>
<td align="center" style="word-wrap:break-word;">
<h1 style="
margin:0;
font-family:Arial,Helvetica,sans-serif;
font-size:24px;
font-weight:bold;
color:#111111;
text-align:center;">
Reset Your Password
</h1>
</td>
</tr>
</table>
</td>
</tr>

<tr><td height="20">&nbsp;</td></tr>

<!-- ================= GREETING ================= -->
<tr>
<td class="content-padding" style="padding:0 40px;word-wrap:break-word;">
<table width="100%" cellpadding="0" cellspacing="0" style="table-layout:fixed;">
<tr>
<td align="left" style="word-wrap:break-word;">
<p style="
margin:0;
font-family:Arial,Helvetica,sans-serif;
font-size:14px;
color:#333333;">
Hi ${name},
</p>
</td>
</tr>
</table>
</td>
</tr>

<tr><td height="25">&nbsp;</td></tr>

<!-- ================= MESSAGE ================= -->
<tr>
<td class="content-padding" style="padding:0 40px;word-wrap:break-word;">
<table width="100%" cellpadding="0" cellspacing="0" style="table-layout:fixed;">
<tr>
<td align="left" style="word-wrap:break-word;">
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
</table>
</td>
</tr>

<tr><td height="30">&nbsp;</td></tr>

<!-- ================= BUTTON ================= -->
<tr>
<td align="center">
<table cellpadding="0" cellspacing="0">
<tr>
<td bgcolor="#f6a545" style="border-radius:4px;">
<a href="${resetLink}" style="
display:inline-block;
padding:12px 26px;
font-family:Arial,Helvetica,sans-serif;
font-size:14px;
color:#ffffff;
text-decoration:none;
font-weight:bold;">
Reset Password
</a>
</td>
</tr>
</table>
</td>
</tr>

<tr><td height="35">&nbsp;</td></tr>

<!-- ================= FALLBACK LINK ================= -->
<tr>
<td class="content-padding" style="padding:0 40px;word-wrap:break-word;">
<table width="100%" cellpadding="0" cellspacing="0" style="table-layout:fixed;">
<tr>
<td align="left" style="word-wrap:break-word;">
<p style="
margin:0;
font-family:Arial,Helvetica,sans-serif;
font-size:12px;
color:#888888;">
If the button does not work, copy and paste this link into your browser:
</p>

<p style="
margin-top:8px;
word-break:break-word;
font-family:Arial,Helvetica,sans-serif;
font-size:12px;
color:#f6a545;">
${resetLink}
</p>
</td>
</tr>
</table>
</td>
</tr>

<tr><td height="30">&nbsp;</td></tr>

<!-- ================= NOTE ================= -->
<tr>
<td class="content-padding" style="padding:0 40px;word-wrap:break-word;">
<table width="100%" cellpadding="0" cellspacing="0" style="table-layout:fixed;">
<tr>
<td align="left" style="word-wrap:break-word;">
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
</table>
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

<!-- ================= TITLE ================= -->
<tr>
<td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="table-layout:fixed;">
<tr>
<td align="center" style="word-wrap:break-word;">
<h1 style="
margin:0;
font-family:Arial,Helvetica,sans-serif;
font-size:24px;
font-weight:bold;
color:#111111;
text-align:center;">
Password Updated Successfully
</h1>
</td>
</tr>
</table>
</td>
</tr>

<tr><td height="20">&nbsp;</td></tr>

<!-- ================= GREETING ================= -->
<tr>
<td class="content-padding" style="padding:0 40px;word-wrap:break-word;">
<table width="100%" cellpadding="0" cellspacing="0" style="table-layout:fixed;">
<tr>
<td align="left" style="word-wrap:break-word;">
<p style="
margin:0;
font-family:Arial,Helvetica,sans-serif;
font-size:14px;
color:#333333;">
Hi ${name},
</p>
</td>
</tr>
</table>
</td>
</tr>

<tr><td height="25">&nbsp;</td></tr>

<!-- ================= MESSAGE ================= -->
<tr>
<td class="content-padding" style="padding:0 40px;word-wrap:break-word;">
<table width="100%" cellpadding="0" cellspacing="0" style="table-layout:fixed;">
<tr>
<td align="left" style="word-wrap:break-word;">
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
</table>
</td>
</tr>

<tr><td height="30">&nbsp;</td></tr>

<!-- ================= SECURITY NOTE ================= -->
<tr>
<td class="content-padding" style="padding:0 40px;word-wrap:break-word;">
<table width="100%" cellpadding="0" cellspacing="0" style="table-layout:fixed;">
<tr>
<td align="left" style="word-wrap:break-word;">
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
</table>
</td>
</tr>

<tr><td height="30">&nbsp;</td></tr>

<!-- ================= FOOT NOTE ================= -->
<tr>
<td class="content-padding" style="padding:0 40px;word-wrap:break-word;">
<table width="100%" cellpadding="0" cellspacing="0" style="table-layout:fixed;">
<tr>
<td align="left" style="word-wrap:break-word;">
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
</table>
</td>
</tr>

`;

  return emailLayout({
    title: "Password Updated",
    body
  });
};
