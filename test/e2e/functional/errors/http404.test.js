const { appeal } = require('test/mock/data/oral/appealReceived');
const { errors, validateSurname } = require('app/assets/locale/en');

Feature('HTTP 404 error page');

Scenario('Verify a 404 when the page does not exist', I => {
  I.amOnPage('/nonexistent');
  I.see(errors.error404.heading);
});

Scenario('Verify a 404 when the surname does not match', I => {
  I.amOnPage(`/validate-surname/${appeal.appealNumber}/trackyourappeal`);
  I.enterSurnameAndSubmit('surname');
  I.see(validateSurname.surname.errors.noMatch);
});
