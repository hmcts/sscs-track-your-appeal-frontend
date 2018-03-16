const { cookiePolicy }  = require('app/assets/locale/en');
const { appeal } = require('test/mock/data/appealReceived');
const paths = require('paths');

const globalCookieMsgID = '#global-cookie-message';

Feature('Cookies');

Scenario('I verify the visibility of the cookie banner and cookie', (I) => {

  I.amOnPage(`${paths.tya.validateSurname}/${appeal.appealNumber}`);
  I.see(cookiePolicy.banner.text, globalCookieMsgID);
  I.see(cookiePolicy.banner.link, globalCookieMsgID);
  I.seeCookie('seen_cookie_message');

});

Scenario('I click the URL within the cookie banner: \'Find out more about cookies\' to view the cookie policy', (I) => {

  I.amOnPage(`${paths.tya.validateSurname}/${appeal.appealNumber}`);
  I.click(cookiePolicy.banner.link, globalCookieMsgID);
  I.seeCurrentUrlEquals(paths.tya.cookiepolicy);
  I.see(cookiePolicy.cookies.title);

});

Scenario('I enter a valid surname and verify the cookie', (I) => {

  I.amOnPage(`${paths.tya.validateSurname}/${appeal.appealNumber}`);
  I.dontSeeCookie('tya-surname-appeal-validated');
  I.enterSurnameAndSubmit(appeal.surname);
  I.seeCookie('tya-surname-appeal-validated');

});

Scenario('I enter an invalid surname and verify the absence of the cookie', (I) => {

  I.amOnPage(`${paths.tya.validateSurname}/${appeal.appealNumber}`);
  I.enterSurnameAndSubmit('invalid');
  I.dontSeeCookie('tya-surname-appeal-validated');

});
