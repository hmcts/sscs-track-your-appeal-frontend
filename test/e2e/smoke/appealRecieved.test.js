const { appeal } = require('test/mock/data/appealReceived');
const paths = require('paths');

Feature('TYA - Appeal Received');

Before((I) => {
  I.amOnPage(`${paths.tya.validateSurname}/${appeal.appealNumber}`);
  I.enterSurnameAndSubmit(appeal.surname);
  I.seeCurrentUrlEquals(`${paths.tya.trackYourAppeal}/${appeal.appealNumber}`);
});

Scenario('Verify appeal details, progress bar status and screen reader text @smoke', (I) => {

  I.seeAppealDetails(appeal);
  I.seeProgressBarAtAppealReceived();
  I.seeScreenReaderTextAtAppealReceived();

});
