/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const { datastores } = require("../../config/datastores");
const bcrypt = require("bcrypt");
module.exports = {
  attributes: {
    fullName: {
      type: "string",
      required: true,
      columnName: "full_name",
    },
    email: {
      type: "string",
      required: true,
      unique: true,
    },
    emailStatus: {
      type: "string",
      isIn: ["unconfirmed", "confirmed"],
      defaultsTo: "unconfirmed",
      columnName: "email_status",
    },
    emailProofToken: {
      type: "string",
      description: "This will be used in the account verification email",
      columnName: "email_proof_token",
    },

    role: {
      type: "string",
      defaultsTo: "user",
    },
    emailProofTokenExpiresAt: {
      type: "number",
      description:
        "time in milliseconds representing when the emailProofToken will expire",
      columnName: "email_proof_token_expires_at",
    },
    password: {
      type: "string",
      required: true,
    },
    passwordResetToken: {
      type: "string",
      description:
        "A unique token used to verify the user's identity when recovering a password.",
      columnName: "password_reset_token",
    },
    passwordResetTokenExpiresAt: {
      type: "number",
      description:
        "A timestamp representing the moment when this user's `passwordResetToken` will expire (or 0 if the user currently has no such token).",
      example: 1508944074211,
      columnName: "password_reset_token_expires_at",
    },
    createdAt: {
      type: "ref",
      autoCreatedAt: true,
    },
    updatedAt: {
      type: "ref",
      autoUpdatedAt: true,
    },
  },

  isValidPassword: async function (password, user) {
    try {
      const match = await bcrypt.compare(password, user.password);
      return match;
    } catch (err) {
      throw err;
    }
  },
};
