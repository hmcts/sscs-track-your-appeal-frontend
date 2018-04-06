const { env } = require('test/e2e/helpers/nunjucksHelper');
const { appeal } = require('test/mock/data/hearing');
const { common, status } = require('public/locale/en');

Feature('TYA - Hearing');

Before(I => {
  I.enterSurnameAndSubmitAndSeeTYA(appeal);
});

Scenario('Verify hearing appeal details, progress bar status, screen reader text and content', I => {
  I.seeAppealDetails(appeal);
  I.seeProgressBarAtHearing();
  I.seeScreenReaderTextAtHearing();

  // Content.
  I.see(common.latestUpdate);
  status.hearing.content.forEach(content => {
    I.see(env.renderString(content, {
      date: appeal.latestEvents[0].date,
      benefitType: appeal.benefitType
    }));
  });
});
