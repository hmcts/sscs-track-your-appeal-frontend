const { appeal } = require('test/mock/data/smokeTest');
const paths = require('paths');

const waitTime = 10;

Feature('Surname validation cookie');

Scenario('User enters a valid surname and leaves a cookie @smoke', I => {
  I.clearCookie();
  I.amOnPage(`${paths.tya.validateSurname}/${appeal.appealNumber}${paths.tya.trackYourAppeal}`);
  I.enterSurnameAndSubmit('Test');
  I.wait(3); // eslint-disable-line
  I.seeCurrentUrlEquals(`${paths.tya.trackYourAppeal}/${appeal.appealNumber}`);
  I.waitForElement('#surname', waitTime);
  I.seeCookie('tya-surname-appeal-validated');
});
