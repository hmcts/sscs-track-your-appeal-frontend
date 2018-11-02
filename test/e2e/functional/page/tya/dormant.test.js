const { env } = require('test/e2e/helpers/nunjucksHelper');
const { appeal } = require('test/mock/data/oral/dormant');
const { common, status } = require('public/locale/en');

Feature('TYA - Dormant');

Before(I => {
  I.enterSurnameAndSubmitAndSeeTYA(appeal);
});

Scenario('Verify dormant appeal details, progress bar status, screen reader text and content', I => {
  I.seeAppealDetails(appeal);
  I.seeProgressBarAtHearing();
  I.seeScreenReaderTextAtHearing();

  // Content
  I.see(common.latestUpdate);
  status.dormant.oral.content.forEach(content => {
    I.see(env.renderString(content, {
      benefitType: appeal.benefitType,
      date: appeal.latestEvents[0].date
    }));
  });
});
