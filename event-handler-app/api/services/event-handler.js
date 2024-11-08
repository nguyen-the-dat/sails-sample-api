const nodemailer = require("nodemailer");
const generateResetPasswordEmailTemplate = require("../utils/email.template");
const sendConfirmOtpWhenCreateAccount = async (emailPayload) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "InDocs.work@gmail.com",
      pass: "wcum vefc nyuc lekc",
    },
  });

  const mailOptions = {
    from: "InDocs.work@gmail.com",
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
