const { env } = require('test/e2e/helpers/nunjucksHelper');
const { appeal } = require('test/mock/data/postponed');
const { common, status } = require('public/locale/en');

Feature('TYA - Postponed');

Before(I => {
  I.enterSurnameAndSubmitAndSeeTYA(appeal);
});

Scenario('Verify postponed appeal details, progress bar status, screen reader text and content', I => {
  I.seeAppealDetails(appeal);
  I.seeProgressBarAtDWPRespond();
  I.seeScreenReaderTextAtDWPRespond();

  // Content
  I.see(common.latestUpdate);
  status.postponed.content.forEach(content => {
    I.see(env.renderString(content, { benefitType: appeal.benefitType }));
  });
});
