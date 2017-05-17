Feature('Track your Appeal Error Pages Tests');

Scenario('verify 404 Error Page', function*(I, Properties) {
  I.amOnPage('/progress/111111/trackyourappeal');
  I.see("Sorry, this page could not be found");
});

Scenario('verify 500 Error Page', function*(I, Properties) {
  let appealId = yield I.retrieveAppealNumberForUnmappedCaseID();
  I.amOnPage('/progress/' + appealId + '/trackyourappeal');
  I.see("Sorry, we're experiencing technical difficulties");
});
