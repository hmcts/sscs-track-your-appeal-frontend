const emailText = require('public/locale/en').notifications.email;

Feature('Manage Notifications');

Scenario('verify change password', function*(I) {
  caseId = yield I.getTestAppealCaseId("lapsedRevisedESAAppealCaseId")
  let authenticationCode = yield I.getMACToken(caseId);
  I.amOnPage('/manage-email-notifications/' + authenticationCode);
  I.see(emailText.manage.title);
  I.checkOption(emailText.addressChangeConfirmed.link);
  I.click("Continue");
  I.wait(2);
  I.fillField('email', 'test2.test@hmcts.net');
  I.fillField('confirmEmail', 'test2.test@hmcts.net');
  I.click("Continue");
  I.wait(2);
  I.see("Emails about your ESA benefit appeal will now be sent to");
  I.see("test2.test@hmcts.net");
  I.see(emailText.addressChangeConfirmed.content);
});

Scenario('check feedback form link', function*(I) {
  caseId = yield I.getTestAppealCaseId("lapsedRevisedESAAppealCaseId")
  yield I.getMACToken(caseId);
  let authenticationCode = yield I.getMessageAuthenticationCode();
  I.amOnPage('/manage-email-notifications/' + authenticationCode);
  I.see(emailText.manage.title);
  I.see("This is a new service – your feedback will help us to improve it.");
  I.click("feedback");
  I.see("Your feedback");
});

Scenario('stop email subscription', function*(I) {
  caseId = yield I.getTestAppealCaseId("lapsedRevisedESAAppealCaseId")
  yield I.getMACToken(caseId);
  let authenticationCode = yield I.getMessageAuthenticationCode();
  I.amOnPage('/manage-email-notifications/' + authenticationCode);
  I.see(emailText.manage.title);
  I.checkOption("Stop receiving emails");
  I.click("Continue");
  I.see("You’ll stop receiving email updates and reminders about your ESA benefit appeal.");
  I.click("Confirm");
  I.see(emailText.stopConfirmation.title);
  I.see(emailText.stopConfirmation.exitFeedbackSurveyPreLink);
  I.see(emailText.stopConfirmation.exitFeedbackSurveyLink);
  I.see("You won’t receive any more emails about your ESA benefit appeal.");
  I.click(emailText.stopConfirmation.exitFeedbackSurveyLink);
});
