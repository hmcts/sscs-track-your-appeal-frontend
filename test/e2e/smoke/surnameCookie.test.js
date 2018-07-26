const { appeal } = require('test/mock/data/smokeTest');
const paths = require('paths');

const waitTime = 20;

Feature('Surname validation cookie');

Scenario('User enters a valid surname and leaves a cookie @smoke', I => {
  I.clearCookie();
  I.amOnPage(`${paths.tya.validateSurname}/${appeal.appealNumber}${paths.tya.trackYourAppeal}`);
  I.enterSurnameAndSubmit('Test');
  I.waitForElement('#surname', waitTime);
  I.seeCookie('tya-surname-appeal-validated');
});
