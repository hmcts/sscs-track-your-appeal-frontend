const {events, progressBar} = require('app/core/events');
const {Logger} = require('@hmcts/nodejs-logging');
const logger = Logger.getLogger('UIUtils.js');

const showProgressBar = (req, res, next) => {

  const appeal = res.locals.appeal;

  if (appeal) {
    const event = events[appeal.status];
    if(event) {
      appeal.showProgressBar = event.index !== progressBar.NONE;
    } else {
      logger.error(`Unable to map the status ${appeal.status} to an event:`);
    }
  } else {
    logger.error('Undefined appeal');
  }

  next();
};

module.exports = { showProgressBar };
