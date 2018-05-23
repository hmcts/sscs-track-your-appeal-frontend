const { env } = require('test/e2e/helpers/nunjucksHelper');
const { appeal } = require('test/mock/data/smokeTest');
const { common, status } = require('public/locale/en');


Feature('TYA - Access an appeal');

Before(I => {
  I.enterSurnameAndSubmitAndSeeTYA(appeal);
});

Scenario('Verify appeal details, progress bar status, screen reader text and content @smoke', I => {
  I.seeAppealDetails(appeal);

  // Content.
  I.see(common.latestUpdate);
});
