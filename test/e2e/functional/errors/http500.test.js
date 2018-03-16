const { errors } = require('app/assets/locale/en');
const { appeal } = require('test/mock/data/appealReceived');

Feature('Internal Server Error');

Scenario('Verify HTTP 500 error page', (I) => {

  I.amOnPage('/validate-surname/xxx');
  I.enterSurnameAndSubmit(appeal.surname);
  I.see(errors.error500.heading);

});
