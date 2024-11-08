/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For more information on configuration, check out:
 * https://sailsjs.com/config/http
 */

module.exports.http = {
  /****************************************************************************
   *                                                                           *
   * Sails/Express middleware to run for every HTTP request.                   *
   * (Only applies to HTTP requests -- not virtual WebSocket requests.)        *
   *                                                                           *
   * https://sailsjs.com/documentation/concepts/middleware                     *
   *                                                                           *
   ****************************************************************************/

  middleware: {
    customMiddleware: function (req, res, next) {
      const startTime = Date.now();
      const { method, url, headers, body } = req;

      res.on("finish", function () {
        const duration = Date.now() - startTime;
        const { statusCode } = res;

        const logMessage = {
          level: "info",
          message: `Request: ${method} ${url}`,
          details: {
            headers: headers,
            body: body,
            responseStatus: statusCode,
            duration: `${duration}ms`,
          },
        };

        const winston = require("winston");
        const { transports, format } = winston;

        const logger = winston.createLogger({
          transports: [
            new transports.MongoDB({
              db: "mongodb://localhost:27017/jira_app",
              collection: "logs",
            }),
          ],
          format: format.combine(format.timestamp(), format.json()),
        });

        // Ghi log thông tin vào MongoDB
        logger.log(logMessage.level, logMessage.message, logMessage.details);
      });

      next();
    },

    order: [
      "cookieParser",
      "session",
      "bodyParser",
      "compress",
      "customMiddleware",
      "poweredBy",
      "router",
      "www",
      "favicon",
    ],
  },
};
