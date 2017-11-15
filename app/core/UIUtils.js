const {events, progressBar} = require('app/core/events');
const logger = require('nodejs-logging').getLogger('UIUtils.js');

const showProgressBar = (req, res, next) => {

  let appeal = res.locals.appeal;

  if (appeal) {
    let event = events[appeal.status];
    if(event) {
      appeal.showProgressBar = event.index !== progressBar.NONE;
    } else {
      logger.error(`Unable to map the status ${appeal.status} to an event:`);
    }
  } else {
    logger.error(`Undefined appeal`);
  }

  next();
};

module.exports = { showProgressBar };
