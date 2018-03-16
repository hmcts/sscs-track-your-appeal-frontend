const { appeal } = require('test/mock/data/appealReceived');
const paths = require('paths');


Feature('Surname validation');

Scenario('User enters a valid surname and sets a cookie @smoke', (I) => {

  I.clearCookie();
  I.amOnPage(`${paths.tya.validateSurname}/${appeal.appealNumber}`);
  I.enterSurnameAndSubmit('Test');
  I.seeCookie('tya-surname-appeal-validated');

});


