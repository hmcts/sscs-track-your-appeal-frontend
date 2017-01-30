const _ = require('lodash');
const moment = require('moment');
const {logging, outputTypes} = require('./logConfig');
const levels = logging.log4js.levels;

let singleton = Symbol();
let singletonEnforcer = Symbol();

class Logger {

  //----------------------------------------------------
  // Public functions
  //----------------------------------------------------

  constructor(enforcer) {
    if (enforcer != singletonEnforcer) {
      throw new Error('Cannot construct Logger singleton, use the static getLogger() function');
    }
  }

  trace(logEntry) {
    logEntry.level = levels.TRACE.toString();
    return this._log(logEntry);
  }

  debug(logEntry) {
    logEntry.level = levels.DEBUG.toString();
    return this._log(logEntry);
  }

  info(logEntry) {
    logEntry.level = levels.INFO.toString();
    return this._log(logEntry);
  }

  warn(logEntry) {
    logEntry.level = levels.WARN.toString();
    return this._log(logEntry);
  }

  error(logEntry) {
    logEntry.level = levels.ERROR.toString();
    return this._log(logEntry);
  }

  fatal(logEntry) {
    logEntry.level = levels.FATAL.toString();
    return this._log(logEntry);
  }

  //----------------------------------------------------
  // Public static functions
  //----------------------------------------------------

  static getLogger(name) {
    if (!this[singleton]) {
      this[singleton] = new Logger(singletonEnforcer);
    }
    this[singleton].logger = logging.log4js.getLogger(name);
    this[singleton].logger.setLevel(logging.currentLevel);

    return this[singleton];
  }

  //----------------------------------------------------
  // Private functions
  //----------------------------------------------------

  _log(logEntry) {
    logEntry = _.merge(logging.defaultLogEntry, logEntry);
    logEntry.timestamp = moment().format(logging.timestampFormat);
    const level = logEntry.level.toLowerCase();

    if (logging.output === outputTypes.single) {
      this.logger[level](JSON.stringify(logEntry)); // single log line
    } else {
      this.logger[level](logEntry); // multi log line
    }

    return logEntry;
  };
}

module.exports = Logger;
