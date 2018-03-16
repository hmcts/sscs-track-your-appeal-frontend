const { appeal } = require('test/mock/data/hearingBooked');

Feature('TYA - Hearing Booked');

Before((I) => {
  I.enterSurnameAndSubmitAndSeeTYA(appeal);
});

Scenario('Verify hearing booked appeal details, progress bar status and screen reader text', (I) => {

  I.seeAppealDetails(appeal);
  I.seeProgressBarAtHearingBooked();
  I.seeScreenReaderTextAtHearingBooked();

});
