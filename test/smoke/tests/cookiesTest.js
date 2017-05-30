Feature('Track your Appeal Cookies Tests');

Scenario('clear cookies and check for cookie message', function*(I, Properties) {
    let appealId = yield I.retrieveAppealNumberForAppealReceivedAppealCaseID();
    I.amOnPage('/progress/' + appealId + '/trackyourappeal');
    I.clearCookie();
    I.see("GOV.UK uses cookies to make the site simpler. Find out more about cookies");
    });

Scenario('accept cookie and verify cookie', function*(I, Properties) {
  let appealId = yield I.retrieveAppealNumberForAppealReceivedAppealCaseID();
  I.amOnPage('/progress/' + appealId + '/trackyourappeal');
  I.click('What to expect at your hearing');
  I.seeCookie('seen_cookie_message');

});

Scenario('verify cookie message page', function*(I, Properties) {
  let appealId = yield I.retrieveAppealNumberForAppealReceivedAppealCaseID();
  I.amOnPage('/progress/' + appealId + '/trackyourappeal');
  I.click('Find out more about cookies');
  I.seeInCurrentUrl('cookiepolicy');
  I.see("Cookie Policy");
  I.see("The ‘track your benefit appeal’ website stores small files (known as cookies), on your computer. They are used to improve your experience of using the website.");
});