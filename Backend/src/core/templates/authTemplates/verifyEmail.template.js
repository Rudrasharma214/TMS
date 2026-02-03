import { emailLayout } from "../../../config/emailTemplate.js";

export const sendVerifyEmailTemplate = (name, verifyLink) => {
  const body = `
<tr>
<td align="center">
  <h1 style="
    margin:0;
    font-family:Arial,Helvetica,sans-serif;
    font-size:26px;
    font-weight:bold;
    color:#111111;">
    Verify Your Email
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
    Please verify your email address to activate your account.
    Click the button below to continue.
  </p>
</td>
</tr>

<tr><td height="30"></td></tr>

<tr>
<td align="center">
  <a href="${verifyLink}"
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
    Verify Email
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
    ${verifyLink}
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
    This link is valid for a limited time.
    If you did not create an account, you can safely ignore this email.
  </p>
</td>
</tr>
`;

  return emailLayout({
    title: "Verify Your Email",
    body
  });
};