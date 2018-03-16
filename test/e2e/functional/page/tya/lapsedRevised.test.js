const { appeal } = require('test/mock/data/lapsedRevised');

Feature('TYA - Lapsed Revised');

Before((I) => {
  I.enterSurnameAndSubmitAndSeeTYA(appeal);
});

Scenario('Verify lapsed revised appeal details and no progress bar', function*(I) {

  I.seeAppealDetails(appeal);
  I.dontSeeAProgressBar();

});
