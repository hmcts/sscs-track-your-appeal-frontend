const { appeal } = require('test/mock/data/smokeTest');
const paths = require('paths');

Feature('Surname validation cookie');

Scenario('User enters a valid surname and leaves a cookie @smoke', I => {
  I.clearCookie();
  I.amOnPage(`${paths.tya.validateSurname}/${appeal.appealNumber}${paths.tya.trackYourAppeal}`);
  I.enterSurnameAndSubmit('Test');
  I.wait('2');
  I.seeCookie('tya-surname-appeal-validated');
}).retry(2);
