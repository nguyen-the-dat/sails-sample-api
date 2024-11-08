const Bull = require("bull");

const registrationQueue = new Bull("registrationQueue", {
  redis: { port: 6379, host: "127.0.0.1" },
});

module.exports = {
  async addRegistrationJob(userData) {
    console.log(userData);
    await registrationQueue.add(userData);
  },
};
