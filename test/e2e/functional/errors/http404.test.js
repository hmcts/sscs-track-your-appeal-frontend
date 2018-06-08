const { appeal } = require('test/mock/data/appealReceived');
const { errors, validateSurname } = require('app/assets/locale/en');

Feature('HTTP 404 error page');

Scenario('Verify a 404 when the page does not exist', I => {
  I.amOnPage('/nonexistent');
  I.see(errors.error404.heading);
});

Scenario('Verify a 404 when the appeal number does not exist', I => {
  I.amOnPage('/validate-surname/xxx');
  I.enterSurnameAndSubmit(appeal.surname);
  I.see(validateSurname.surname.errors.noMatch);
});

Scenario('Verify a 404 when the surname does not match', I => {
  I.amOnPage(`/validate-surname/${appeal.appealNumber}`);
  I.enterSurnameAndSubmit('surname');
  I.see(validateSurname.surname.errors.noMatch);
});
