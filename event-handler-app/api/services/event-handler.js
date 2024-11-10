require("dotenv").config();
const nodemailer = require("nodemailer");
const generateResetPasswordEmailTemplate = require("../utils/email.template");
const sendConfirmOtpWhenCreateAccount = async (emailPayload) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GOOGLE_USER,
      pass: process.env.GOOGLE_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.GOOGLE_USER,
    to: emailPayload.email,
    subject: emailPayload.subject,
    html: generateResetPasswordEmailTemplate(emailPayload.confirmationToken),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendConfirmOtpWhenCreateAccount;
