// api/controllers/user/create.js
const generateOTP = require("../../utils/generate-otp");
const QueueService = require("../../services/QueueService");
module.exports = {
  friendlyName: "Create user",
  description: "Create a new user",

  inputs: {
    email: {
      type: "string",
      required: true,
      isEmail: true,
      description: "New user's email address.",
    },
    password: {
      type: "string",
      required: true,
      minLength: 6,
      description: "New user's password",
    },
    fullName: {
      type: "string",
      required: true,
    },
  },

  exits: {
    emailAlreadyInUse: {
      statusCode: 409,
      description: "Email already in use",
    },

    notInFormatEmail: {
      statusCode: 400,
      description: "Email is not in format",
    },
  },

  fn: async function (inputs, exits) {
    const existingUser = await User.findOne({ email: inputs.email });
    if (existingUser) {
      return exits.emailAlreadyInUse({
        message: "Email exists",
      });
    }

    const bcrypt = require("bcrypt");
    const hashedPassword = await bcrypt.hash(inputs.password, 10);

    const newUser = await User.create({
      email: inputs.email,
      password: hashedPassword,
      fullName: inputs.fullName,
    }).fetch();

    (async () => {
      try {
        const otp = generateOTP();

        const userData = {
          to: inputs.email,
          subject: "Welcome email",
          confirmationToken: otp,
        };
        await QueueService.addRegistrationJob(userData);
      } catch (error) {
        console.error("Error adding job to the email queue:", error);
      }
    })();

    return exits.success(newUser);
  },
};
