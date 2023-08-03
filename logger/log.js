var winston = require("winston");
var logger = new winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      level: "info",
      filename: process.cwd() + "/logger/info.log",
      handleExceptions: false,
      maxsize: 3145728, // (3MB) Maximum size in bytes of the file, if the size is exceeded then a new file is created.
    }),
    new winston.transports.File({
      level: "error",
      filename: process.cwd() + "/logger/exception.log",
      maxsize: 3145728,
      handleExceptions: true,
    }),
    new winston.transports.Console({
      level: "debug",
      handleExceptions: true,
      filename: process.cwd() + "/logger/debug.log",
    }),
  ],
  exitOnError: false, // To prevent exit after logging an uncaughtException
});

logger.on("error", function (err) {});

module.exports = logger;
