import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export const sendAdmin = async(email, password) => {
    await transporter.sendMail({
        from: `"no-reply" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'E-Learning Software. ',
        html: _buildAdminInviteHTML(email, password)
    })
}

export const sendLecturer = async(email, password) => {
    await transporter.sendMail({
        from: `"no-reply" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'E-Learning Software. ',
        html: _buildLecturerInviteHTML(email, password)
    })
}

export const changePasswordVerification = async(email) => {
    await transporter.sendMail({
        from: `"no-reply" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'E-Learning Software. ',
        html: _buildPasswordChangedHTML(email)
    })
}

export const _buildAdminInviteHTML = (email, password) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Verify Your Email - E-Learning Software.</title>
    </head>
    <body style="margin:0; padding:0; font-family: Poppins, sans-serif; background-color: #f9f9f9;">

      <table align="center" cellpadding="0" cellspacing="0" width="100%" 
            style="max-width:600px; margin:10px auto; background: #ffffff; 
                    border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.08); 
                    overflow:hidden; text-align:center;">
        
        <!-- Header -->
        <tr>
          <td style="padding:20px; display:flex; align-items:center; justify-content:center; background-color: #f4f4f4;">
            <img src="/images/logo.png" alt="Tutor Connect Logo" 
                style="height:40px; margin-right:10px;">
            <span style="font-size:20px; font-weight:bold; color:#00412E;">E-Leaning Software Team</span>
          </td>
        </tr>

        <!-- Title -->
        <tr>
          <td style="padding:32px 24px 16px 24px;">
            <h3 style="margin:0; font-size:22px; font-weight:500; color: #333;">
              🎉 Congratulations on Joining E-Learning team! 🎉
            </h3>
          </td>
        </tr>

        <!-- Message -->
        <tr>
            <td style="padding:0 32px 16px 32px;">
                <p style="font-size:15px; line-height:1.6; color: #555; margin:0;">
                    Welcome to <strong>E-Learning Software</strong>! <br><br>
                    Your account has been successfully created. You can use the following credentials to log in:
                </p>
                <ul style="font-size:15px; line-height:1.6; color: #555; margin:8px 0 0 0; padding-left: 20px; list-style-type:none;">
                    <li><strong>Email:</strong> ${email}</li>
                    <li><strong>Password:</strong> ${password}</li>
                </ul>
                <p style="font-size:15px; line-height:1.6; color: #555; margin:16px 0 0 0;">
                    Please use your <strong>email address</strong> to log in. We recommend changing your password after your first login to keep your account secure.
                </p>
            </td>
        </tr>


        <!-- Footer -->
        <tr>
          <td style="padding:20px; border-top:1px solid #ddd; background:#f9f9f9; font-size:12px; color:#888;">
            <p style="margin:0; font-size:13px;">
              E-Learning Software, a software to managing your leaning content.
            </p>
            <p style="margin:6px 0 0 0;">&copy; 2025 E-Learning. All rights reserved.</p>
          </td>
        </tr>

      </table>

    </body>
    </html>

  `;
};

export const _buildLecturerInviteHTML = (email, password) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Verify Your Email - E-Learning Software.</title>
    </head>
    <body style="margin:0; padding:0; font-family: Poppins, sans-serif; background-color: #f9f9f9;">

      <table align="center" cellpadding="0" cellspacing="0" width="100%" 
            style="max-width:600px; margin:10px auto; background: #ffffff; 
                    border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.08); 
                    overflow:hidden; text-align:center;">
        
        <!-- Header -->
        <tr>
          <td style="padding:20px; display:flex; align-items:center; justify-content:center; background-color: #f4f4f4;">
            <img src="/images/logo.png" alt="Tutor Connect Logo" 
                style="height:40px; margin-right:10px;">
            <span style="font-size:20px; font-weight:bold; color:#00412E;">E-Leaning Software Team</span>
          </td>
        </tr>

        <!-- Title -->
        <tr>
          <td style="padding:32px 24px 16px 24px;">
            <h3 style="margin:0; font-size:22px; font-weight:500; color: #333;">
              🎉 Congratulations on Joining E-Learning team as a new lecturer! 🎉
            </h3>
          </td>
        </tr>

        <!-- Message -->
        <tr>
            <td style="padding:0 32px 16px 32px;">
                <p style="font-size:15px; line-height:1.6; color: #555; margin:0;">
                    Welcome to <strong>E-Learning Software</strong>! <br><br>
                    Your account has been successfully created. You can use the following credentials to log in:
                </p>
                <ul style="font-size:15px; line-height:1.6; color: #555; margin:8px 0 0 0; padding-left: 20px; list-style-type:none;">
                    <li><strong>Email:</strong> ${email}</li>
                    <li><strong>Password:</strong> ${password}</li>
                </ul>
                <p style="font-size:15px; line-height:1.6; color: #555; margin:16px 0 0 0;">
                    Please use your <strong>email address</strong> to log in. We recommend changing your password after your first login to keep your account secure.
                </p>
            </td>
        </tr>


        <!-- Footer -->
        <tr>
          <td style="padding:20px; border-top:1px solid #ddd; background:#f9f9f9; font-size:12px; color:#888;">
            <p style="margin:0; font-size:13px;">
              E-Learning Software, a software to managing your leaning content.
            </p>
            <p style="margin:6px 0 0 0;">&copy; 2025 E-Learning. All rights reserved.</p>
          </td>
        </tr>

      </table>

    </body>
    </html>

  `;
};

export const _buildPasswordChangedHTML = (email) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Password Changed Successfully - E-Learning Software</title>
    </head>
    <body style="margin:0; padding:0; font-family: Poppins, sans-serif; background-color: #f9f9f9;">

      <table align="center" cellpadding="0" cellspacing="0" width="100%" 
            style="max-width:600px; margin:10px auto; background:#ffffff; 
                   border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.08); 
                   overflow:hidden; text-align:center;">
        
        <!-- Header -->
        <tr>
          <td style="padding:20px; background-color:#f4f4f4;">
            <span style="font-size:20px; font-weight:bold; color:#F56E0F; vertical-align:middle;">
              E-Learning Software Team
            </span>
          </td>
        </tr>

        <!-- Title -->
        <tr>
          <td style="padding:32px 24px 16px 24px;">
            <h3 style="margin:0; font-size:22px; font-weight:500; color:#333;">
              Your password has been updated successfully
            </h3>
          </td>
        </tr>

        <!-- Message -->
        <tr>
          <td style="padding:0 32px 24px 32px;">
            <p style="font-size:15px; line-height:1.6; color:#555; margin:0;">
              Hi <strong>${email}</strong>,<br><br>
              This is a confirmation that your password for 
              <strong>E-Learning Software</strong> has been changed successfully.
            </p>
            <p style="font-size:15px; line-height:1.6; color:#555; margin:16px 0 0 0;">
              If you did not make this change, please reset your password immediately or 
              contact our support team.
            </p>
            <a href="https://your-app-login-link.com" 
               style="display:inline-block; margin-top:20px; padding:12px 20px; 
                      background-color:#F56E0F; color:#fff; text-decoration:none; 
                      border-radius:6px; font-size:15px; font-weight:500;">
              Contact Us
            </a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px; border-top:1px solid #ddd; background:#f9f9f9; font-size:12px; color:#888;">
            <p style="margin:0; font-size:13px;">
              E-Learning Software, helping you manage your learning content securely.
            </p>
            <p style="margin:6px 0 0 0;">&copy; 2025 E-Learning. All rights reserved.</p>
          </td>
        </tr>

      </table>

    </body>
    </html>
  `;
};
