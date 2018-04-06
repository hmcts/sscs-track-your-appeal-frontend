const { appeal } = require('test/mock/data/withdrawn');
const { common, status } = require('public/locale/en');

Feature('TYA - Withdrawn');

Before(I => {
  I.enterSurnameAndSubmitAndSeeTYA(appeal);
});

Scenario('Verify appeal details, no progress bar and content', I => {
  I.seeAppealDetails(appeal);
  I.dontSeeAProgressBar();

  // Content
  I.see(common.latestUpdate);
  status.withdrawn.content.forEach(content => {
    I.see(content);
  });
});
