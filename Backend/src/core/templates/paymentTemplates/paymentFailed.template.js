import { emailLayout } from "../../../config/emailTemplate.js";

export const sendPaymentFailedEmailTemplate = ({
  transactionId,
  planName,
  name
}) => {
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
color:#b00020;">
Payment Failed
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

<tr><td height="20">&nbsp;</td></tr>

<!-- ================= MAIN MESSAGE ================= -->
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
Unfortunately, your payment for the <strong>${planName}</strong> plan was unsuccessful.
</p>

<p style="
margin:14px 0 0 0;
font-family:Arial,Helvetica,sans-serif;
font-size:14px;
color:#555555;
line-height:22px;">
Please complete the payment as soon as possible. Until the payment is successful, your subscription will remain inactive.
</p>

<p style="
margin:14px 0 0 0;
font-family:Arial,Helvetica,sans-serif;
font-size:13px;
color:#666666;
line-height:20px;">
Transaction ID: <strong>${transactionId}</strong>
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
If you believe this is an error or need help completing the payment, reply to this email and our support team will assist you.
</p>
</td>
</tr>
</table>
</td>
</tr>

`;

  return emailLayout({
    title: "Payment Failed",
    body
  });
};
