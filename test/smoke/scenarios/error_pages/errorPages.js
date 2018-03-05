Feature('Track your Appeal Error Pages Tests');

Scenario('verify 404 Error Page', function*(I) {
  yield * I.goToPageAfterSurnameValidation('/trackyourappeal/:id', 'appealReceivedAppealCaseId');
  I.amOnPage('/trackyourappeal/111111');
  I.see("Sorry, this page could not be found");
  I.see('Cookie');
  I.click('Cookie');
  I.see('Cookie Policy');
});
