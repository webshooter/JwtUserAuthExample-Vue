import { transports, createLogger, format } from "winston";

// eslint-disable-next-line import/named
import { root } from "../config";

const { combine, colorize } = format;

const fileOptions = {
  handleExceptions: true,
  json: true,
  maxsize: 5242880, // 5MB
  maxFiles: 5,
  colorize: false,
};

const prettyJson = format.printf(({ message, level, timestamp }) => {
  const formattedMessage = message.constructor === Object
    ? JSON.stringify(message, null, 4)
    : message;
  return `[${level}] ${timestamp}: ${formattedMessage}`;
});

// define the custom settings for each transport (file, console)
const logOptions = {
  error: {
    ...fileOptions,
    filename: `${root}/logs/error.log`,
    level: "error",
  },
  combined: {
    ...fileOptions,
    filename: `${root}/logs/combined.log`,
    level: "info",
  },
  console: {
    format: combine(
      colorize(),
      format.timestamp(),
      format.splat(),
      prettyJson,
    ),
    handleExceptions: true,
    level: "debug",
  },
};

// instantiate a new Winston Logger with the settings defined above
const logger = createLogger({
  transports: [
    new transports.File(logOptions.error),
    new transports.File(logOptions.combined),
  ],

  // do not exit on handled exceptions
  exitOnError: false,
});

if (process.env.NODE_ENV !== "production") {
  logger.add(new transports.Console(logOptions.console));
}

export default logger;
