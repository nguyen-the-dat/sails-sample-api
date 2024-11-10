var jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  friendlyName: "verify access token",
  description:
    "verify user credentials to check whether user is authenticated or not",
  inputs: {
    token: {
      type: "string",
      required: true,
      example: "eyJhbGcidd",
    },
  },
  fn: async function (inputs, exits) {
    console.log("come to verify token");
    const token = inputs.token.replace("Bearer ", "");
    console.log(token);
    try {
      const decoded = await jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET_SIGNATURE
      );
      return exits.success(decoded);
    } catch (error) {
      return exits.error(new Error("Token verification failed"));
    }
  },
};
