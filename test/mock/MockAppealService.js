const Appeal = require('app/core/Appeal');
const mockedData = require('test/mock/data/index');
const HttpStatus = require('http-status-codes');

class MockAppealService {

  static getAppeal(req, res, next) {
    if (!mockedData[req.params.id]) {
      const errMsg = `No mocked JSON file for appeal id: ${req.params.id} - try these instead: ${Object.keys(mockedData)}`;
      const err = new Error(errMsg);
      err.status = HttpStatus.NOT_FOUND;
      next(err);
    } else {
      const appeal = new Appeal(mockedData[req.params.id].appeal);
      appeal.decorate();
      res.locals.appeal = appeal;
      next();
    }
  }

  static changeEmailAddress(id, subscriptionId, body) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve({
        appeal_id: 'md200',
        email: 'mickey.mouse@disney.com',
        id: 6,
        mobileNumber: "07533457331"
      }), 50);
    });
  }

  static stopReceivingEmails(id, subscriptionId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve({
        appeal_id: 'md200',
        email: 'mickey.mouse@disney.com',
        id: 6,
        mobileNumber: "07533457331"
      }), 50);
    });
  }
}

module.exports = MockAppealService;
