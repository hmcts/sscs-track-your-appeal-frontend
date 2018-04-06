const { appeal } = require('test/mock/data/appealReceived');
const paths = require('paths');

Feature('Google analytics');

Before(I => {
  I.amOnPage(`${paths.tya.validateSurname}/${appeal.appealNumber}`);
});

Scenario('Verify Google Analytics has been loaded', I => {
  I.seeInSource('<script src="/public/javascripts/google-analytics-universal-tracker.js"></script>');
});

Scenario('Verify UA account code has been loaded', I => {
  I.amOnPage('/public/javascripts/tya-analytics-tracker.js');
  I.seeInSource('universalId: \'UA-91309785-1\'');
});
