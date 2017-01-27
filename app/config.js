const LEVELS = require('log4js').levels;
const SERVICE_NAME = 'Track my appeal for Social Security and Child Support';
const TRACK_YOUR_APPEAL_ENDPOINT = (process.env.SSCS_API_URL || 'http://localhost:8080') + '/appeals';
const MOCK_DATA = process.env.SSCS_MOCK_DATA ? true : false;

const STATUSES = {
  APPEAL_RECEIVED: 0,
  DWP_RESPOND: 1,
  HEARING_BOOKED: 2,
  HEARING: 3
};

const LOGGING = {
  appenders: [
    {
      type: 'console',
      layout: {
        type: 'pattern',
        pattern: "%m"
      }
    },
  ],
  replaceConsole: true,
  //  ---------------------------------------
  //      log4js - log levels
  //  ---------------------------------------
  //  ALL: new Level(Number.MIN_VALUE, "ALL"),
  //  TRACE: new Level(5000, "TRACE"),
  //  DEBUG: new Level(10000, "DEBUG"),
  //  INFO: new Level(20000, "INFO"),
  //  WARN: new Level(30000, "WARN"),
  //  ERROR: new Level(40000, "ERROR"),
  //  FATAL: new Level(50000, "FATAL"),
  //  OFF: new Level(Number.MAX_VALUE, "OFF"),
  CURRENT_LEVEL: process.env.LOG_LEVEL || LEVELS.INFO,

  // Set to true: view JSON logs on a single line - the default setting for production.
  // Set to false: view JSON logs over multiple lines - helpful during development.
  JSON_STRINGIFY: true,
};

module.exports = {
  STATUSES: STATUSES,
  SERVICE_NAME: SERVICE_NAME,
  MOCK_DATA: MOCK_DATA,
  TRACK_YOUR_APPEAL_ENDPOINT: TRACK_YOUR_APPEAL_ENDPOINT,
  LOGGING: LOGGING
};
