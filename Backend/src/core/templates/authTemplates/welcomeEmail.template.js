import { emailLayout } from "../../../config/emailTemplate.js";

export const sendWelcomeEmailTemplate = (name) => {
  const body = `

<!-- ================= TITLE ================= -->
<tr>
<td>
<table width="100%" cellpadding="0" cellspacing="0">
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
</table>
</td>
</tr>

<tr><td height="20">&nbsp;</td></tr>

<!-- ================= GREETING ================= -->
<tr>
<td>
<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="left" style="padding:0 40px;">
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
<td>
<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="left" style="padding:0 40px;">
<p style="
margin:0;
font-family:Arial,Helvetica,sans-serif;
font-size:14px;
color:#555555;
line-height:22px;">
Welcome to <strong> Flowstack!</strong>!
Your account has been successfully created, and you’re all set to get started.
</p>
</td>
</tr>
</table>
</td>
</tr>

<tr><td height="30">&nbsp;</td></tr>

<!-- ================= SUPPORT NOTE ================= -->
<tr>
<td>
<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="left" style="padding:0 40px;">
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
</table>
</td>
</tr>

`;

  return emailLayout({
    title: "Welcome",
    body
  });
};
