const { appeal } = require('test/mock/data/dwpRespondOverdue');

Feature('TYA - DWP Respond Overdue');

Before((I) => {
  I.enterSurnameAndSubmitAndSeeTYA(appeal);
});

Scenario('Verify DWP respond overdue appeal details, progress bar status and screen reader text', (I) => {

  I.seeAppealDetails(appeal);
  I.seeProgressBarAtAppealReceived();
  I.seeScreenReaderTextAtAppealReceived();

});
