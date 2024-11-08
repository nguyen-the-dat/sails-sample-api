var jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  friendlyName: "generate access token",
  description: "return a token after user provides valid credentials",
  inputs: {
    payload: {
      type: "json",
      required: true,
      example: {
        userId: "33gfdsa3w53",
        email: "testuser@gmail.com",
        role: "user",
      },
      description: "user payload",
    },
  },

  fn: async function (inputs, exits) {
    const jwtClaims = inputs.payload;
    const accessToken = jwt.sign(
      jwtClaims,
      process.env.ACCESS_TOKEN_SECRET_SIGNATURE,
      {
        expiresIn: process.env.ACCESS_TOKEN_LIFE_TIME,
      }
    );
    return exits.success(accessToken);
  },
};
