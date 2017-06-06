const cookiePolicyText = require('public/locale/en').cookiePolicy;
const hearingDetailsText = require('public/locale/en').hearing.details;

Feature('Track your Appeal Cookies Tests');

Scenario('clear cookies and check for cookie message', function*(I, Properties) {
  let appealId = yield I.retrieveAppealNumberForAppealReceivedAppealCaseID();
  I.amOnPage('/progress/' + appealId + '/trackyourappeal');
  I.clearCookie();
  I.see(cookiePolicyText.banner.text);
  I.see(cookiePolicyText.banner.link);
});

Scenario('accept cookie and verify cookie', function*(I, Properties) {
  let appealId = yield I.retrieveAppealNumberForAppealReceivedAppealCaseID();
  I.amOnPage('/progress/' + appealId + '/trackyourappeal');
  I.click(hearingDetailsText.title);
  I.seeCookie(cookiePolicyText.ourIntroductoryMessage.items[0].name);
});

Scenario('verify cookie message page', function*(I, Properties) {
  let appealId = yield I.retrieveAppealNumberForAppealReceivedAppealCaseID();
  I.amOnPage('/progress/' + appealId + '/trackyourappeal');
  I.click(cookiePolicyText.banner.link);
  I.seeInCurrentUrl('cookiepolicy');
  I.see(cookiePolicyText.cookies.title);
  I.see(cookiePolicyText.cookies.description);

});
