const { appeal } = require('test/mock/data/pastHearingBooked');

Feature('TYA - Past Hearing Booked');

Before((I) => {
  I.enterSurnameAndSubmitAndSeeTYA(appeal);
});

Scenario('Verify past hearing booked appeal details, progress bar status and screen reader text', (I) => {

  I.seeAppealDetails(appeal);
  I.seeProgressBarAtDWPRespond();
  I.seeScreenReaderTextAtDWPRespond();

});
