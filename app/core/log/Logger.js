const moment = require('moment');
const {KEYS, VALUES} = require('app/core/log/logKeys');
const LOG_CONFIG = require('app/config').LOGGING;
const log4js = require('log4js');
log4js.configure(LOG_CONFIG);
const LEVELS = log4js.levels;
const os = require('os');

let singleton = Symbol();
let singletonEnforcer = Symbol();

class Logger {

  constructor(enforcer, name) {
    if (enforcer != singletonEnforcer) {
      throw new Error('Cannot construct Logger singleton, use the static getLogger() function');
    }

    this.logger = log4js.getLogger(name);
    this.logger.setLevel(LOG_CONFIG.CURRENT_LEVEL);
  }

  static getLogger() {
    if (!this[singleton]) {
      this[singleton] = new Logger(singletonEnforcer, VALUES.TRACK_YOUR_APPEAL);
    }
    return this[singleton];
  }

  /****************************************************
   * Public functions
   ****************************************************/

  trace(logEntry) {
    logEntry.level = LEVELS.TRACE.toString();
    return this._log(logEntry);
  }

  debug(logEntry) {
    logEntry.level = LEVELS.DEBUG.toString();
    return this._log(logEntry);
  }

  info(logEntry) {
    logEntry.level = LEVELS.INFO.toString();
    return this._log(logEntry);
  }

  warn(logEntry) {
    logEntry.level = LEVELS.WARN.toString();
    return this._log(logEntry);
  }

  error(logEntry) {
    logEntry.level = LEVELS.ERROR.toString();
    return this._log(logEntry);
  }

  fatal(logEntry) {
    logEntry.level = LEVELS.FATAL.toString();
    return this._log(logEntry);
  }

  /****************************************************
   * Private functions
   ****************************************************/

  _addToLogEntry(logEntry) {
    // User defined logging
    logEntry[KEYS.MESSAGE] = logEntry.message || VALUES.EMPTY_STRING;
    logEntry[KEYS.RESPONSE_CODE] = logEntry.responseCode || VALUES.EMPTY_STRING;
    logEntry[KEYS.ENVIRONMENT] = logEntry.environment || VALUES.EMPTY_STRING;
    logEntry[KEYS.HOSTNAME] = os.hostname();
    logEntry[KEYS.ROOT_REQUEST_ID] = logEntry.rootRequestId || VALUES.EMPTY_STRING;
    logEntry[KEYS.REQUEST_ID] = logEntry.requestId || VALUES.EMPTY_STRING;
    logEntry[KEYS.ORIGIN_REQUEST_ID] = logEntry.originRequestId || VALUES.EMPTY_STRING;

    // Key, Value pair fields.
    if (!logEntry[KEYS.FIELDS]) {
      logEntry[KEYS.FIELDS] = [];
    }

    // Default logging
    logEntry[KEYS.TYPE] = VALUES.NODEJS;
    logEntry[KEYS.MICROSERVICE] = VALUES.TRACK_YOUR_APPEAL;
    logEntry[KEYS.TEAM] = VALUES.SSCS;
    logEntry[KEYS.TIMESTAMP] = moment().format(VALUES.TIMESTAMP_FORMAT);

    return logEntry;
  };

  _log(logEntry) {
    let updatedLogEntry = this._addToLogEntry(logEntry);
    const logLevel = updatedLogEntry.level.toLowerCase();

    if(LOG_CONFIG.JSON_STRINGIFY) {
      this.logger[logLevel](JSON.stringify(updatedLogEntry)); // The actual log to stdout
    } else {
      this.logger[logLevel](updatedLogEntry); // The actual log to stdout
    }

    return updatedLogEntry;
  };
}

module.exports = Logger;
