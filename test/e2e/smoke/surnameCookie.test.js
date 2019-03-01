const { appeal } = require('test/mock/data/oral/smokeTest');

Feature('Surname validation cookie');

Scenario('User enters a valid surname and leaves a cookie @smoke', I => {
  I.clearCookie();
  I.enterSurnameAndSubmitAndSeeTYA(appeal);
  I.wait('2');
  I.seeCookie('tya-surname-appeal-validated');
});
