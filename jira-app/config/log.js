const winston = require("winston");
const { transports, format } = winston;
require("winston-mongodb"); // Đảm bảo bạn đã require winston-mongodb

module.exports.log = {
  custom: {
    log: function (level, message) {
      const logger = winston.createLogger({
        level: level,
        transports: [
          new transports.MongoDB({
            db: "mongodb://localhost:27017/jira_app",
            collection: "logs",
          }),
          new transports.Console(),
        ],
        format: format.combine(format.timestamp(), format.json()),
      });
      logger.log(level, message);
    },
    info: function (message) {
      this.log("info", message);
    },
    error: function (message) {
      this.log("error", message);
    },

    debug: function (message) {
      this.log("debug", message);
    },
  },
};
