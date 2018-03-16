const { hearing, claimExpenses, evidence, contactUs, cookiePolicy } = require('app/assets/locale/en');
const { appeal } = require('test/mock/data/appealReceived');
const paths = require('paths');

Feature('TYA anchor links');

Before((I) => {
  I.enterSurnameAndSubmitAndSeeTYA(appeal);
});

Scenario('Clicking the \'What to expect at your hearing\' link ', (I) => {

  I.click(hearing.expectations.title);
  I.see(hearing.expectations.title);
  I.seeCurrentUrlEquals(`${paths.tya.aboutHearing}/${appeal.appealNumber}`);

});

Scenario('Clicking the \'Claiming hearing expenses\' link ', (I) => {

  I.click(claimExpenses.link);
  I.see(claimExpenses.title);
  I.seeCurrentUrlEquals(`${paths.tya.expenses}/${appeal.appealNumber}`);

});

Scenario('Clicking the \'Providing evidence to support your appeal\' link ', (I) => {

  I.click(evidence.provide.title);
  I.see(evidence.provide.title);
  I.seeCurrentUrlEquals(`${paths.tya.evidence}/${appeal.appealNumber}`);

});

Scenario('Clicking the \'Contact us\' link ', (I) => {

  I.click(contactUs.title);
  I.see(evidence.provide.title);
  I.seeCurrentUrlEquals(`${paths.tya.contactus}/${appeal.appealNumber}`);

});

Scenario('Clicking the \'Cookies\' link ', (I) => {

  I.click(cookiePolicy.footer.cookies);
  I.see(cookiePolicy.cookies.title);
  I.seeCurrentUrlEquals(paths.tya.cookiepolicy);
});
