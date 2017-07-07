const emailText = require('public/locale/en').notifications.email;

Feature('Manage Notifications');

Scenario('verify change password ', function*(I) {
  let authenticationCode = yield I.getMACToken();
  I.amOnPage('/manage-email-notifications/' + authenticationCode);
  I.see(emailText.manage.title);
  I.checkOption(emailText.addressChangeConfirmed.link);
  I.click("Continue");
  I.wait(2);
  I.fillField('email', 'test2.test@hmcts.net');
  I.fillField('email2', 'test2.test@hmcts.net');
  I.click("Continue");
  I.wait(2);
  I.see(emailText.addressChangeConfirmed.title);
  I.see("test2.test@hmcts.net");
  I.see(emailText.addressChangeConfirmed.content);
});

Scenario('check feedback form link  ', function*(I) {
  let authenticationCode = yield I.getMessageAuthenticationCode();
  I.amOnPage('/manage-email-notifications/' + authenticationCode);
  I.see(emailText.manage.title);
  I.see("This is a new service – your feedback will help us to improve it.");
  I.click("feedback");
  I.see("Your feedback");
});

Scenario('stop email subscription  ', function*(I) {
  let authenticationCode = yield I.getMessageAuthenticationCode();
  I.amOnPage('/manage-email-notifications/' + authenticationCode);
  I.see(emailText.manage.title);
  I.checkOption("Stop receiving emails");
  I.click("Continue");
  I.see(emailText.stop.title);
  I.click("Confirm");
  I.see(emailText.stopConfirmation.title);
  I.see(emailText.stopConfirmation.content);
});

