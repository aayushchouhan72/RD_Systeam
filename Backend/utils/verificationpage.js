export const verificationEmailTemplate = (email, link) => {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Email Verification</title>
    </head>
    <body style="margin:0; padding:0; background:#f4f6f8; font-family: Arial, sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center" style="padding:40px 0;">
            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden;">
              
              <!-- Header -->
              <tr>
                <td style="background:#2563eb; padding:20px; color:#ffffff; text-align:center;">
                  <h2 style="margin:0;">RD Company</h2>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding:30px; color:#333333;">
                  <p>Hi <strong>${email}</strong>,</p>
                  
                  <p>
                    Thank you for signing up. Please verify your email address
                    by clicking the button below.
                  </p>

                  <p style="text-align:center; margin:40px 0;">
                    <a href="${link}"
                      style="
                        background:#2563eb;
                        color:#ffffff;
                        padding:12px 24px;
                        text-decoration:none;
                        border-radius:6px;
                        display:inline-block;
                        font-weight:bold;
                      ">
                      Verify Email
                    </a>
                  </p>

                  <p>
                    If the button doesn’t work, copy and paste this link
                    into your browser:
                  </p>

                  <p style="word-break:break-all;">
                    <a href="${link}">${link}</a>
                  </p>

                  <p style="margin-top:30px;">
                    This link will expire in 24 hours.
                  </p>

                  <p>
                    Thanks,<br />
                    <strong>RD Company Team</strong>
                  </p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background:#f1f5f9; padding:15px; text-align:center; color:#6b7280; font-size:12px;">
                  © ${new Date().getFullYear()} RD Company. All rights reserved.
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
};
