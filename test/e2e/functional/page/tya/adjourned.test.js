const { env } = require('test/e2e/helpers/nunjucksHelper');
const { appeal } = require('test/mock/data/oral/adjourned');
const { common, status } = require('public/locale/en');

Feature('TYA - Adjourned');

Before(I => {
  I.enterSurnameAndSubmitAndSeeTYA(appeal);
});

Scenario('Verify adjourned appeal details, progress bar status, screen reader text and content', I => {
  I.seeAppealDetails(appeal);
  I.seeProgressBarAtDWPRespond();
  I.seeScreenReaderTextAtDWPRespond();

  // Content.
  I.see(common.latestUpdate);
  status.adjourned.oral.content.forEach(content => {
    I.see(env.renderString(content, { benefitType: appeal.benefitType }));
  });
});
