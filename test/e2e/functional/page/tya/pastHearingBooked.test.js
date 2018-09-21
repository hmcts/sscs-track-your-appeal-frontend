const { env } = require('test/e2e/helpers/nunjucksHelper');
const { appeal } = require('test/mock/data/oral/pastHearingBooked');
const { common, status } = require('public/locale/en');

Feature('TYA - Past Hearing Booked');

Before(I => {
  I.enterSurnameAndSubmitAndSeeTYA(appeal);
});

Scenario('Verify past hearing booked appeal details, progress bar status, screen reader text and content', I => {
  I.seeAppealDetails(appeal);
  I.seeProgressBarAtDWPRespond();
  I.seeScreenReaderTextAtDWPRespond();

  // Content
  I.see(common.latestUpdate);
  I.see(env.renderString(status.pastHearingBooked.oral.content, { benefitType: appeal.benefitType }));
});
