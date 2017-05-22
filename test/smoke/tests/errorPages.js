Feature('Track your Appeal Error Pages Tests');

Scenario('verify 404 Error Page', function*(I, Properties) {
  I.amOnPage('/progress/111111/trackyourappeal');
  I.see("Sorry, this page could not be found");
});
