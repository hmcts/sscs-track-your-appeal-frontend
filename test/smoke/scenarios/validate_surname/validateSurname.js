const validateSurnameContent = require('public/locale/en').validateSurname;
const data = require('test/mock/data/lapsedRevised');
let appealId;

Feature('Validate Surname page');

Before(function*(I) {

  const caseId = yield I.getTestAppealCaseId("lapsedRevisedESAAppealCaseId");
  const authenticationCode = yield I.getMACToken(caseId);
  appealId = yield I.retrieveAppealNumber(caseId);
  I.amOnPage(`/validate-surname/${authenticationCode}`);
  I.see(validateSurnameContent.heading);

});

Scenario('When I enter the correct surname that matches to the mactoken, I am taken to the progress page', (I) => {

  I.fillField('#surname', data.appeal.surname);
  I.click(validateSurnameContent.submit);
  I.seeInCurrentUrl(`/progress/${appealId}/trackyourappeal`);

});

Scenario('When I enter a surname that doesn\'t match the mactoken, I see errors', (I) => {

  I.fillField('#surname', 'InvalidSurname');
  I.click(validateSurnameContent.submit);
  I.see(validateSurnameContent.surname.errors.noMatch);

});

Scenario('When I click submit without filling in the field, I see errors', (I) => {

  I.fillField('#surname', '');
  I.click(validateSurnameContent.submit);
  I.see(validateSurnameContent.surname.errors.emptyField);

});

Scenario('When I enter an invalid surname, I see errors', (I) => {

  I.fillField('#surname', '343434');
  I.click(validateSurnameContent.submit);
  I.see(validateSurnameContent.surname.errors.invalid);

});
