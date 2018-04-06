const { appeal } = require('test/mock/data/appealReceived');
const { validateSurname } = require('public/locale/en');
const paths = require('paths');

Feature('Verify surname');

Before(I => {
  I.amOnPage(`${paths.tya.validateSurname}/${appeal.appealNumber}`);
});

Scenario('I enter a surname that matches the appeal, I am taken to /trackyourappeal', I => {
  I.enterSurnameAndSubmit(appeal.surname);
  I.seeInCurrentUrl(`/trackyourappeal/${appeal.appealNumber}`);
});

Scenario('I enter a surname that does not match the appeal, I see errors', I => {
  I.enterSurnameAndSubmit('invalid');
  I.see(validateSurname.surname.errors.noMatch);
});

Scenario('I omit the surname and submit, I see errors', I => {
  I.click(validateSurname.submit);
  I.see(validateSurname.surname.errors.emptyStringHeading);
});

Scenario('I enter a surname that is incorrectly formatted, I see errors', I => {
  I.enterSurnameAndSubmit('surn4m£');
  I.see(validateSurname.surname.errors.notValidHeading);
});
