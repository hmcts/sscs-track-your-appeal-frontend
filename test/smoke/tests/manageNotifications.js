const emailText = require('public/locale/en').notifications.email;

Feature('Manage Notifications');

Scenario('verify change password ', function*(I, Properties) {
  let authenticationCode = yield I.getMACToken();
  I.amOnPage('/manage-email-notifications/' + authenticationCode);
  I.see(emailText.manage.title);
  I.checkOption(emailText.addressChangeConfirmed.link);
  I.click("Continue");
  I.wait(1);
  I.fillField('email', 'test2.test@hmcts.net');
  I.fillField('email2', 'test2.test@hmcts.net');
  I.click("Continue");
  I.wait(1);
  I.see(emailText.addressChangeConfirmed.title);
  I.see("test2.test@hmcts.net");
  I.see(emailText.addressChangeConfirmed.content);
});

Scenario('stop email subscription  ', function*(I, Properties) {
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
