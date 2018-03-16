const { appeal } = require('test/mock/data/dormant');

Feature('TYA - Dormant');

Before((I) => {
  I.enterSurnameAndSubmitAndSeeTYA(appeal);
});

Scenario('Verify dormant appeal details, progress bar status and screen reader text', (I) => {

  I.seeAppealDetails(appeal);
  I.seeProgressBarAtHearing();
  I.seeScreenReaderTextAtHearing();

});



