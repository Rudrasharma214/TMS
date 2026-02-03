import { emailLayout } from "../../../config/emailTemplate.js";

export const sendLoginOtpEmailTemplate = (name, otp, expiresIn) => {
  const body = `
<tr>
<td align="center">
  <h1 style="
    margin:0;
    font-family:Arial,Helvetica,sans-serif;
    font-size:26px;
    font-weight:bold;
    color:#111111;">
    Login Verification
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
    Use the following one-time password (OTP) to complete your login.
    This code is valid for a ${expiresIn}.
  </p>
</td>
</tr>

<tr><td height="30"></td></tr>

<!-- OTP BOX -->
<tr>
<td align="center">
  <div style="
    display:inline-block;
    padding:14px 28px;
    border:1px dashed #f6a545;
    border-radius:6px;
    font-family:Arial,Helvetica,sans-serif;
    font-size:24px;
    letter-spacing:6px;
    font-weight:bold;
    color:#111111;">
    ${otp}
  </div>
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
    For your security, do not share this code with anyone.
    If you did not attempt to log in, please ignore this email.
  </p>
</td>
</tr>
`;

  return emailLayout({
    title: "Login Verification Code",
    body
  });
};
