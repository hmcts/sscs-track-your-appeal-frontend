const appeals = require('../props/properties').testAppeals;
const moment = require('moment');

class testDataHelper extends codecept_helper {

    getTestAppeal(desc) {
        return appeals.filter(element => element.appealDesc === desc)[0];
    }

    getTestAppealCaseId(desc) {
        return this.getTestAppeal(desc).appealCaseId;
    }

    calcAppealDate(desc, numberOfDays) {
        const calcDate = new Date(this.getTestAppeal(desc).hearingDate);
        calcDate.setDate(calcDate.getDate() + numberOfDays);
        return moment(calcDate).format('DD MMMM YYYY');
    }

    async setCookieeee(appealId) {
      let cookies = await this.helpers['Nightmare'].browser
        .cookies.set({
          url: "http://localhost:3000",
          name: "surnameValidated",
          value: 'true'
        })
        .goto('http://localhost:3000/progress/' + appealId + '/trackyourappeal')
        .cookies.get();

      console.log(cookies);
    }

}

module.exports = testDataHelper

