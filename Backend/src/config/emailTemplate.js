export const emailLayout = ({ title, body }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
</head>

<body style="margin:0;padding:0;background-color:#f2f2f2;">

<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#f2f2f2">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0">

<!-- TOP BAR -->
<tr>
  <td height="140" bgcolor="#f6a545"></td>
</tr>

<!-- CARD -->
<tr>
<td align="center">

<table width="520" cellpadding="0" cellspacing="0"
style="background:#ffffff;margin-top:-90px;border-radius:6px;">

<tr><td height="40"></td></tr>

${body}

<tr><td height="40"></td></tr>

</table>

</td>
</tr>

<!-- FOOTER -->
<tr>
<td align="center" style="padding-top:20px;">
<p style="
margin:0;
font-family:Arial,Helvetica,sans-serif;
font-size:11px;
color:#999999;">
© ${new Date().getFullYear()} Your Company. All rights reserved.
</p>
</td>
</tr>

<tr><td height="30"></td></tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;
