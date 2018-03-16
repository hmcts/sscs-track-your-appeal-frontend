const { appeal } = require('test/mock/data/dwpRespond');

Feature('TYA - DWP Respond');

Before((I) => {
  I.enterSurnameAndSubmitAndSeeTYA(appeal);
});

Scenario('Verify DWP respond appeal details, progress bar status and screen reader text', function*(I) {

  I.seeAppealDetails(appeal);
  I.seeProgressBarAtDWPRespond();
  I.seeScreenReaderTextAtDWPRespond();

});
