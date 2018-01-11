const appeals = require('../props/properties').testAppeals;
moment = require('moment');

class testDataHelper extends codecept_helper {

getTestAppeal(desc) {

  return appeals.filter(element => element.appealDesc === desc)[0]

}

getTestAppealCaseId(desc) {

  return this.getTestAppeal(desc).appealCaseId;

}

calcAppealDate(desc, numberOfDays) {

    const calcDate = new Date(this.getTestAppeal(desc).hearingDate)

    calcDate.setDate(calcDate.getDate() + numberOfDays)

  return moment(calcDate).format('DD MMMM YYYY')

}

}

module.exports = testDataHelper
