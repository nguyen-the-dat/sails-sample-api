const sendConfirmOtpWhenCreateAccount = require("../services/event-handler");
const Bull = require("bull");

const registrationQueue = new Bull("registrationQueue", {
  redis: { host: "localhost", port: 6379 },
});

registrationQueue.process(async (job) => {
  try {
    const { to, subject, confirmationToken } = job.data;

    await sendConfirmOtpWhenCreateAccount({
      email: to,
      confirmationToken: confirmationToken,
      subject: subject,
    });

    return Promise.resolve();
  } catch (error) {
    console.error("Error processing job:", error);
    return Promise.reject(error);
  }
});

module.exports = {
  startListener: function () {
    console.log("Listen to registrationQueue");
  },
};
