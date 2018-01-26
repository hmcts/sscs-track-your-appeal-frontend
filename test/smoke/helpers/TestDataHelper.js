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
        console.log('------')
        console.log(this.getTestAppeal(desc).hearingDate);
        console.log(calcDate)
        calcDate.setDate(calcDate.getDate() + numberOfDays);
        console.log(calcDate.getDate() + numberOfDays);
        console.log(calcDate);
        return moment(calcDate).format('DD MMMM YYYY');
    }

    async setSurnameValidationCookieAndGoToPage(route) {
      //s%3Atrue.Xik2GYciTLcfdSbE%2FSQ1W1mMmcJg8OrQAdsI6yDQNp8
      const nightmare = this.helpers['Nightmare'].browser;
      await nightmare
        .cookies.set({
          url: nightmare.options.url,
          name: 'surnameValidated',
          value: 's%3Atrue.Xik2GYciTLcfdSbE%2FSQ1W1mMmcJg8OrQAdsI6yDQNp8'
        })
        .goto(`${nightmare.options.url}${route}`);
    }

}

module.exports = testDataHelper;
