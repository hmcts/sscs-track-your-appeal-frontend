// const { appeal } = require('test/mock/data/oral/appealReceived');
// const { validateSurname } = require('public/locale/en');
// const paths = require('paths');

// Feature('Verify surname');

// Before(I => {
//   I.amOnPage(`${paths.tya.validateSurname}/${appeal.appealNumber}${paths.tya.trackYourAppeal}`);
// });

// Scenario('I enter a surname that matches the appeal, I am taken to /trackyourappeal', I => {
//   I.enterSurnameAndSubmit(appeal.surname);
//   I.wait('2');
//   I.seeInCurrentUrl(`/trackyourappeal/${appeal.appealNumber}`);
// });

// Scenario('I enter a surname that does not match the appeal, I see errors', I => {
//   I.enterSurnameAndSubmit('invalid');
//   I.wait('2');
//   I.see(validateSurname.surname.errors.noMatch);
// });
// Scenario('I omit the surname and submit, I see errors', I => {
//   I.click(validateSurname.submit);
//   I.see(validateSurname.surname.errors.emptyStringHeading);
// }).retry(1);
