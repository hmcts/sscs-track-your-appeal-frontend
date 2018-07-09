const { hearing, claimExpenses, evidence, contactUs, cookiePolicy } = require('app/assets/locale/en');
const { appeal } = require('test/mock/data/appealReceived');
const paths = require('paths');

Feature('TYA anchor links ');

Before(I => {
  I.enterSurnameAndSubmitAndSeeTYA(appeal);
});

Scenario('Clicking the \'What to expect at your hearing\' link ', I => {
  I.navByClick(hearing.expectations.title);
  I.wait('2');
  I.see(hearing.expectations.title);
  I.seeCurrentUrlEquals(`${paths.tya.aboutHearing}/${appeal.appealNumber}`);
});

Scenario('Clicking the \'Claiming hearing expenses\' link ', I => {
  I.navByClick(claimExpenses.link);
  I.wait('2');
  I.see(claimExpenses.title);
  I.seeCurrentUrlEquals(`${paths.tya.expenses}/${appeal.appealNumber}`);
}).retry(1);

Scenario('Clicking the \'Providing evidence to support your appeal\' link ', I => {
  I.navByClick(evidence.provide.title);
  I.wait('2');
  I.see(evidence.provide.title);
  I.seeCurrentUrlEquals(`${paths.tya.evidence}/${appeal.appealNumber}`);
}).retry(1);

Scenario('Clicking the \'Contact us\' link ', I => {
  I.navByClick(contactUs.title);
  I.wait('2');
  I.see(evidence.provide.title);
  I.seeCurrentUrlEquals(`${paths.tya.contactus}/${appeal.appealNumber}`);
});

Scenario('Clicking the \'Cookies\' link ', I => {
  I.navByClick(cookiePolicy.footer.cookies);
  I.wait('2');
  I.see(cookiePolicy.cookies.title);
  I.seeCurrentUrlEquals(paths.tya.cookiepolicy);
});
