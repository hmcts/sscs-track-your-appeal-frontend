const mockedData = require('test/mock/data/index');
const HttpStatus = require('http-status-codes');

const getAppeal = (req, res, next) => {
  if (!mockedData[req.params.id]) {
    const errMsg = `No mocked JSON file for appeal id: ${req.params.id} - try these instead: ${Object.keys(mockedData)}`;
    const err = new Error(errMsg);
    err.status = HttpStatus.NOT_FOUND;
    next(err);
  } else {

    const appeal = mockedData[req.params.id].appeal;
    appeal.evidenceReceived = false;
    appeal.latestEvents = appeal.latestEvents || [];
    appeal.historicalEvents = appeal.historicalEvents || [];
    res.locals.appeal = appeal;

    next();
  }
};

const changeEmailAddress = (req, res, next) => {
  next();
};

const stopReceivingEmails = (req, res, next) => {
  res.locals.token.appealId = 'md005';
  next();
};

module.exports = { getAppeal, changeEmailAddress, stopReceivingEmails};
