const appeals = require('../props/properties').testAppeals;
moment = require('moment');

class testDataHelper extends codecept_helper {

getTestAppeal(desc)
  {
  let result = [];
  appeals.forEach(function(element)
  { if (element.appealDesc == desc) result.push(element); })
  return result[0];
  }

getTestAppealCaseId(desc)
{
   const caseId = this.getTestAppeal(desc).appealCaseId;
   return caseId;
}

calcAppealDate(desc, numberOfDays) {
    const calcDate = new Date(this.getTestAppeal(desc).hearingDate);
    calcDate.setDate(calcDate.getDate() + numberOfDays);
    const result = moment(calcDate).format('DD MMMM YYYY');
  return result;
}

}

module.exports = testDataHelper;
