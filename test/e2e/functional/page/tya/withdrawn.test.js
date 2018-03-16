const { appeal } = require('test/mock/data/withdrawn');
const content = require('public/locale/en');

Feature('TYA - Withdrawn');

Before((I) => {
  I.enterSurnameAndSubmitAndSeeTYA(appeal);
});

Scenario('Verify appeal details, no progress bar and content', function*(I) {

  I.seeAppealDetails(appeal);
  I.dontSeeAProgressBar();

  // Content specific to Withdrawn.
  I.see(content.common.latestUpdate);
  I.see(content.status.withdrawn.content[0]);
  I.see(content.status.withdrawn.content[1]);
});
