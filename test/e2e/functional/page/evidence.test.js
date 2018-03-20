const appeals = require('test/mock/data');
const paths = require('paths');

Feature('Evidence');

Object.values(appeals).forEach(appealData => {

  Scenario('When I go to the evidence page I see the correct where to send evidence address', (I) => {

    const appeal = appealData.appeal;
    I.enterSurnameAndSubmitAndSeeTYA(appeal);
    I.amOnPage(`${paths.tya.evidence}/${appeal.appealNumber}`);

    appeal.regionalProcessingCenter.addressLines.forEach(line => {
      I.see(line);
    });

  });

});
