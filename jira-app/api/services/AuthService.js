const jwt = require("jsonwebtoken");
const CustomError = require("../errors/CustomError");

module.exports = {
  loginService: async function (userEmail, userPassword) {
    try {
      const user = await User.findOne({ email: userEmail });
      if (!user) {
        throw new CustomError("User not found", 404);
      }

      const isMatch = await User.isValidPassword(userPassword, user);
      if (!isMatch) {
        throw new CustomError("Password is incorrect", 400);
      }

      const jwtClaims = {
        userId: user.id,
        role: user.role,
        email: user.email,
      };

      const accessToken = sails.helpers.generateToken(jwtClaims);
      return accessToken;
    } catch (error) {
      throw error;
    }
  },
};
