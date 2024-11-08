const { authenticator } = require("otplib");

const generateOTP = () => {
  const secret = authenticator.generateSecret();
  const otp = authenticator.generate(secret);
  return otp;
};

module.exports = generateOTP;
