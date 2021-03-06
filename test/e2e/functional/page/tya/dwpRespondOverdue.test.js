const { appeal } = require('test/mock/data/oral/dwpRespondOverdue');
const { common } = require('public/locale/en');

Feature('TYA - DWP Respond Overdue');

Before(I => {
  I.enterSurnameAndSubmitAndSeeTYA(appeal);
});

Scenario('Verify DWP respond overdue appeal details, progress bar status, screen reader text and content', I => {
  I.seeAppealDetails(appeal);
  I.seeProgressBarAtAppealReceived();
  I.seeScreenReaderTextAtAppealReceived();

  // Content
  I.see(common.latestUpdate);
});
