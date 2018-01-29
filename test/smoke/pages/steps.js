'use strict';

module.exports = function () {
  return actor({

    goToPageAfterSurnameValidation: function*(path, caseType) {

      const caseId = yield this.getTestAppealCaseId(caseType);
      const appealId = yield this.retrieveAppealNumber(caseId);
      const appealSurname = yield this.getSurnameFromAppeal(caseType);
      path = path.replace(':id', appealId);

      this.amOnPage(path);
      this.seeInCurrentUrl(`/validate-surname/${appealId}?redirect=${path}`);
      this.see('Enter your last name');
      this.fillField('#surname', appealSurname);
      this.click('Track your appeal');

    }

  });
};
