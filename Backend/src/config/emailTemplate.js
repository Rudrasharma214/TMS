export const emailLayout = ({ title, body }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    @media (max-width: 640px) {
      .email-container {
        width: 100% !important;
        max-width: 100% !important;
      }
      .content-padding {
        padding: 0 20px !important;
      }
    }
  </style>
</head>

<body style="margin:0;padding:0;background:transparent;">

<table width="100%" cellpadding="0" cellspacing="0" style="min-width:320px;">
<tr>
<td align="center" style="padding:0;">

<!-- MAIN CONTAINER -->
<table width="600" cellpadding="0" cellspacing="0" class="email-container" style="background:#ffffff;border-radius:6px;overflow:hidden;max-width:600px;margin:0 auto;">

<!-- ================= HEADER ================= -->
<tr>
<td bgcolor="#f6a545" align="center" style="padding:20px;">
  <span style="
    font-family:Arial,Helvetica,sans-serif;
    font-size:22px;
    font-weight:bold;
    color:#ffffff;
    display:block;
    text-align:center;">
    Flowstack
  </span>
</td>
</tr>

<!-- ================= BODY ================= -->
<tr>
<td style="padding:10px 0px;">
<table width="100%" cellpadding="0" cellspacing="0" style="table-layout:fixed;">
${body}
</table>
</td>
</tr>

<!-- ================= FOOTER ================= -->
<tr>
<td align="center" style="padding:25px;">

<table width="100%" cellpadding="0" cellspacing="0" style="table-layout:fixed;">

<!-- DIVIDER -->
<tr>
<td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="table-layout:fixed;">
<tr>
<td height="1" style="background:#dddddd;line-height:1px;font-size:1px;">
&nbsp;
</td>
</tr>
</table>
</td>
</tr>

<tr><td height="16"></td></tr>

<!-- COPYRIGHT -->
<tr>
<td align="center">
<p style="
  margin:0;
  font-family:Arial,Helvetica,sans-serif;
  font-size:12px;
  color:#777777;
  text-align:center;">
  © ${new Date().getFullYear()} Flowstack. All rights reserved.
</p>
</td>
</tr>

</table>

</td>
</tr>


</table>
<!-- END CONTAINER -->

</td>
</tr>
</table>

</body>
</html>
`;
