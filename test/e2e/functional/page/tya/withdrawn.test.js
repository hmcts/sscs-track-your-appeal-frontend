const { appeal } = require('test/mock/data/oral/withdrawn');
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
    // do not check the keys that would need compiling
    if (content.indexOf('{{benefitType|agencyAcronym}}') === -1) {
      I.see(content);
    }
  });
});
