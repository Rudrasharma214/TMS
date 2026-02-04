import { emailLayout } from "../../../config/emailTemplate.js";

export const sendPaymentSuccessEmailTemplate = ({
  transactionId,
  planName,
  name,
  amount,
  startDate,
  endDate,
  billingCycle
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
color:#111111;">
Payment Successful
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
Thank you for purchasing the <strong>${planName}</strong> plan.
</p>

<p style="
margin:14px 0 0 0;
font-family:Arial,Helvetica,sans-serif;
font-size:14px;
color:#555555;
line-height:22px;">
We’ve successfully received your payment of <strong>${amount}</strong>, and your subscription is now active.
</p>

<p style="
margin:14px 0 0 0;
font-family:Arial,Helvetica,sans-serif;
font-size:14px;
color:#555555;
line-height:22px;">
Your subscription starts on <strong>${startDate}</strong> and will remain active until <strong>${endDate}</strong>.
After that, your plan will renew on a <strong>${billingCycle}</strong> basis.
</p>

<p style="
margin:14px 0 0 0;
font-family:Arial,Helvetica,sans-serif;
font-size:14px;
color:#555555;
line-height:22px;">
We’ve attached your invoice to this email for your records. You can also review your billing details anytime from your dashboard.
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
If you have any questions about your subscription or billing, simply reply to this email and our support team will be happy to assist you.
</p>
</td>
</tr>
</table>
</td>
</tr>

`;

  return emailLayout({
    title: "Payment Successful",
    body
  });
};
