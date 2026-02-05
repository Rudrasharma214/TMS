import { emailLayout } from "../../../config/emailTemplate.js";

export const sendLoginOtpEmailTemplate = (name, otp, expiresIn) => {
  const body = `

<!-- ================= TITLE (CENTER) ================= -->
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
Login Verification
</h1>
</td>
</tr>
</table>
</td>
</tr>

<tr><td height="20">&nbsp;</td></tr>

<!-- ================= GREETING (LEFT) ================= -->
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

<!-- ================= MESSAGE (LEFT) ================= -->
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
Use the following one-time password (OTP) to complete your login.
This code is valid for ${expiresIn}.
</p>
</td>
</tr>
</table>
</td>
</tr>

<tr><td height="30">&nbsp;</td></tr>

<!-- ================= OTP BOX (CENTER) ================= -->
<tr>
<td align="center">
<table cellpadding="0" cellspacing="0">
<tr>
<td style="
padding:14px 28px;
border:1px dashed #f6a545;
border-radius:6px;
font-family:Arial,Helvetica,sans-serif;
font-size:24px;
letter-spacing:6px;
font-weight:bold;
color:#111111;">
${otp}
</td>
</tr>
</table>
</td>
</tr>

<tr><td height="30">&nbsp;</td></tr>

<!-- ================= SECURITY NOTE (LEFT) ================= -->
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
For your security, do not share this code with anyone.
If you did not attempt to log in, please ignore this email.
</p>
</td>
</tr>
</table>
</td>
</tr>

`;

  return emailLayout({
    title: "Login Verification Code",
    body
  });
};
