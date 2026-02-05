import { emailLayout } from "../../../config/emailTemplate.js";

export const sendVerifyEmailTemplate = (name, verifyLink) => {
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
            Verify Your Email
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
            Please verify your email address to activate your account.
            Click the button below to continue.
          </p>
        </td>
      </tr>
    </table>
  </td>
</tr>

<tr><td height="30">&nbsp;</td></tr>

<!-- ================= BUTTON (CENTER) ================= -->
<tr>
  <td align="center">
    <table cellpadding="0" cellspacing="0">
      <tr>
        <td bgcolor="#f6a545" style="border-radius:4px;">
          <a href="${verifyLink}" style="
            display:inline-block;
            padding:12px 26px;
            font-family:Arial,Helvetica,sans-serif;
            font-size:14px;
            color:#ffffff;
            text-decoration:none;
            font-weight:bold;">
            Verify Email
          </a>
        </td>
      </tr>
    </table>
  </td>
</tr>

<tr><td height="35">&nbsp;</td></tr>

<!-- ================= FALLBACK LINK (LEFT) ================= -->
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
            ${verifyLink}
          </p>
        </td>
      </tr>
    </table>
  </td>
</tr>

<tr><td height="30">&nbsp;</td></tr>

<!-- ================= EXPIRY NOTE (LEFT) ================= -->
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
            This link is valid for a limited time.
            If you did not create an account, you can safely ignore this email.
          </p>
        </td>
      </tr>
    </table>
  </td>
</tr>

`;

  return emailLayout({
    title: "Verify Your Email",
    body
  });
};
