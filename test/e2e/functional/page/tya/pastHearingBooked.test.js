const { env } = require('test/e2e/helpers/nunjucksHelper');
const { appeal } = require('test/mock/data/pastHearingBooked');
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
  status.pastHearingBooked.content.forEach(content => {
    I.see(env.renderString(content, {
      benefitType: appeal.benefitType,
      hearingContactDate: appeal.latestEvents[0].hearingContactDate
    }));
  });
});
