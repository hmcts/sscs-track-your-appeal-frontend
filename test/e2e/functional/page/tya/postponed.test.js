const { appeal } = require('test/mock/data/postponed');

Feature('TYA - Postponed');

Before((I) => {
  I.enterSurnameAndSubmitAndSeeTYA(appeal);
});

Scenario('Verify postponed appeal details, progress bar status and screen reader text', function*(I) {

  I.seeAppealDetails(appeal);
  I.seeProgressBarAtDWPRespond();
  I.seeScreenReaderTextAtDWPRespond();

});
