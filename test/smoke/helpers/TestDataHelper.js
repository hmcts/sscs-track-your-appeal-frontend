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
   let caseId = this.getTestAppeal(desc).appealCaseId;
   return caseId;
}

calcAppealDate(desc, numberOfDays) {
    let calcDate = new Date(this.getTestAppeal(desc).hearingDate);
    calcDate.setDate(calcDate.getDate() + numberOfDays);
    let result = moment(calcDate).format('DD MMMM YYYY');
  return result;
}

}

module.exports = testDataHelper;
