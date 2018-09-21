const { appeal } = require('test/mock/data/oral/newHearingBooked');
const { common, status } = require('public/locale/en');

Feature('TYA - New Hearing Booked');

Before(I => {
  I.enterSurnameAndSubmitAndSeeTYA(appeal);
});

Scenario('Verify new hearing booked appeal details, progress bar status, screen reader text and content', I => {
  I.seeAppealDetails(appeal);
  I.seeProgressBarAtHearingBooked();
  I.seeScreenReaderTextAtHearingBooked();

  // Content
  I.see(common.latestUpdate);
  I.see(status.newHearingBooked.content);
});
