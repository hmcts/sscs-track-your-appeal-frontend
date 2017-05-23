Feature('Manage Notifications');

Scenario('verify change password ', function*(I, Properties) {
  let authenticationCode = yield I.getMACToken();
  I.amOnPage('/manage-email-notifications/' + authenticationCode);
  I.see('What do you want to do?');
  I.checkOption("Change your email address");
  I.click("Continue");
  I.fillField('email', 'test2.test@hmcts.net');
  I.fillField('email2', 'test2.test@hmcts.net');
  I.click("Continue");
  I.see("Emails about your ESA benefit appeal will now be sent to");
  I.see("test2.test@hmcts.net");

});

Scenario('stop email subscription  ', function*(I, Properties) {
  let authenticationCode = yield I.getMessageAuthenticationCode();
  I.amOnPage('/manage-email-notifications/' + authenticationCode);
  I.see('What do you want to do?');
  I.checkOption("Stop receiving emails");
  I.click("Continue");
  I.see("You’ll stop receiving email updates and reminders about your ESA benefit appeal.");
  I.click("Confirm");
  I.see("You’ve stopped email notifications");
  I.see("You won’t receive any more emails about your ESA benefit appeal.");
});
