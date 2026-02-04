export const emailLayout = ({ title, body }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
</head>

<body style="margin:0;padding:0;background:transparent;">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center">

<!-- MAIN CONTAINER -->
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:6px;overflow:hidden;">

<!-- ================= HEADER ================= -->
<tr>
<td bgcolor="#f6a545" align="center" style="padding:20px;">
  <span style="
    font-family:Arial,Helvetica,sans-serif;
    font-size:22px;
    font-weight:bold;
    color:#ffffff;">
    Flowstack
  </span>
</td>
</tr>

<!-- ================= BODY ================= -->
<tr>
<td style="padding:40px 30px;">
<table width="100%" cellpadding="0" cellspacing="0">
${body}
</table>
</td>
</tr>

<!-- ================= FOOTER ================= -->
<tr>
<td align="center" style="padding:25px;">

<table width="100%" cellpadding="0" cellspacing="0">

<!-- DIVIDER -->
<tr>
<td align="center">
<table width="100%" cellpadding="0" cellspacing="0">
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
  color:#777777;">
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
