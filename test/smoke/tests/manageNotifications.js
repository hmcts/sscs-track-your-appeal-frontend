Feature('Manage Notifications');

Scenario('verify change password ', function*(I, Properties) {
  let authenticationCode = yield I.generateMessageAuthenticationCode();
  I.amOnPage('/manage-email-notifications/' + authenticationCode );
  I.see('What do you want to do?');
  I.checkOption("Change your email address");
  I.click("Continue");
  I.fillField('email', 'naveen.manga@hmcts.net');
  I.fillField('email2', 'naveen.manga@hmcts.net');
  I.click("Continue");
  I.see("Emails about your ESA benefit appeal will now be sent to")
  I.see("naveen.manga@hmcts.net");
  I.click ("Change your email address");
  I.fillField('email', 'Vivek.Reddy@HMCTS.NET');
  I.fillField('email2', 'Vivek.Reddy@HMCTS.NET');
  I.click("Continue");
  I.see("Emails about your ESA benefit appeal will now be sent to")
  I.see("Vivek.Reddy@HMCTS.NET");
});

Scenario('stop email subscription  ', function*(I, Properties) {
  let authenticationCode = yield I.getMessageAuthenticationCode();
  I.amOnPage('/manage-email-notifications/' + authenticationCode );
  I.see('What do you want to do?');
  I.checkOption("Stop receiving emails");
  I.click("Continue");
  I.see("You’ll stop receiving email updates and reminders about your ESA benefit appeal.");
  I.click("Confirm");
  I.see("You’ve stopped email notifications");
  I.see("You won’t receive any more emails about your ESA benefit appeal.")
});
