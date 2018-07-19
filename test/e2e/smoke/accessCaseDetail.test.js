const { appeal } = require('test/mock/data/smokeTest');
const { common } = require('public/locale/en');


Feature('TYA - Access an appeal');

Before(I => {
  I.enterSurnameAndSubmitAndSeeTYA(appeal);
});

Scenario('Verify appeal details, progress bar status, screen reader text and content @smoke', I => {
  I.wait('2');
  I.seeAppealDetails(appeal);

  // Content.
  I.see(common.latestUpdate);
}).retry(2); // eslint-disable-line
