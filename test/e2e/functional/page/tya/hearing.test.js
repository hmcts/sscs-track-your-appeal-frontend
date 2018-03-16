const { appeal } = require('test/mock/data/hearing');

Feature('TYA - Hearing');

Before((I) => {
  I.enterSurnameAndSubmitAndSeeTYA(appeal);
});

Scenario('Verify hearing appeal details, progress bar status and screen reader text', (I) => {

  I.seeAppealDetails(appeal);
  I.seeProgressBarAtHearing();
  I.seeScreenReaderTextAtHearing();

});
