const { appeal } = require('test/mock/data/newHearingBooked');

Feature('TYA - New Hearing Booked');

Before((I) => {
  I.enterSurnameAndSubmitAndSeeTYA(appeal);
});

Scenario('Verify new hearing booked appeal details, progress bar status and screen reader text', (I) => {

  I.seeAppealDetails(appeal);
  I.seeProgressBarAtHearingBooked();
  I.seeScreenReaderTextAtHearingBooked();

});
