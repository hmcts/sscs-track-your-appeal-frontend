const pageText = require('public/locale/en');
const dbProperties = require('../../props/properties').dataBaseFields;

Feature('Track your Appeal Page Tests');

Scenario('verify appellant details after Appeal Received', function*(I) {
  const date = yield I.calcAppealDate('appealReceivedAppealCaseId', 35);
  yield * I.goToPageAfterSurnameValidation('/trackyourappeal/:id', 'appealReceivedAppealCaseId');
  I.see('Mr. A Alpha');
  I.see('Appeal reference number: SC111/11/1111');
  I.see(pageText.progressBar.screenReader.appeal.happened);
  I.see(pageText.progressBar.screenReader.dwpRespond.due);
  I.see(pageText.progressBar.screenReader.hearingBooked.due);
  I.see(pageText.progressBar.screenReader.hearing.due);
  I.see(pageText.common.latestUpdate);
  I.see(`We’ve told DWP that you’ve appealed against their decision. They should respond before ${date}. We’ll contact you and explain the next steps when they’ve replied.`)
});

Scenario('verify appellant details after DWP response received', function*(I, Properties) {
  yield * I.goToPageAfterSurnameValidation('/trackyourappeal/:id', 'dwpAppealCaseId');
  I.see('Mr. B Bravo');
  I.see('Appeal reference number: SC222/22/22222');
  I.see(pageText.progressBar.screenReader.appeal.happened);
  I.see(pageText.progressBar.screenReader.dwpRespond.happened);
  I.see(pageText.progressBar.screenReader.hearingBooked.due);
  I.see(pageText.progressBar.screenReader.hearing.due);
  I.see(pageText.common.latestUpdate);
  I.click(Properties.fields.view_previous_updates_link_css_path, 'View previous updates');
  I.see(pageText.status.appealReceived.heading);
  I.see(pageText.evidence.notReceived);
  I.see('05 January 2017', Properties.fields.sub_headings_h3_css_path);
  I.click('Providing evidence to support your appeal');
  I.see('Providing evidence to support your appeal');
});

Scenario('verify appellant details after Hearing Booked', function*(I, Properties) {
  yield * I.goToPageAfterSurnameValidation('/trackyourappeal/:id', 'hearingBookedAppealCaseId');
  I.see('Mr. C Charlie');
  I.see('Appeal reference number: SC333/33/33333');
  I.see(pageText.progressBar.screenReader.appeal.happened);
  I.see(pageText.progressBar.screenReader.dwpRespond.happened);
  I.see(pageText.progressBar.screenReader.hearingBooked.happened);
  I.see(pageText.progressBar.screenReader.hearing.due);
  I.see(pageText.common.latestUpdate);
  I.click(Properties.fields.view_previous_updates_link_css_path, 'View previous updates');
  I.see(pageText.status.appealReceived.heading);
  I.see('24 June 2017', Properties.fields.sub_headings_h3_css_path);
  I.see(pageText.status.dwpRespond.heading);
  I.see('24 June 2017', Properties.fields.sub_headings_h3_css_path);
  I.click(pageText.hearingDetails.checkDetails);
  I.see(pageText.hearingDetails.checkDetails);
});

Scenario('verify hearing details', function*(I) {
  yield * I.goToPageAfterSurnameValidation('/progress/:id/hearingdetails', 'hearingBookedAppealCaseId');
  I.see('Mr. C Charlie');
  I.see('Appeal reference number: SC333/33/33333');
  I.see('Date');
  I.see('30 March 2017');
  I.see('Time');
  I.see('13:15 (arrive 15 minutes before)');
  I.see('Location');
  I.see("Chester Magistrate's Court");
  I.see("Grosvenor Street");
  I.see("Chester");
  I.see('CH1 2XA');
  I.see(pageText.hearingDetails.incorrect);
  I.click("Maps and directions");
  I.seeInCurrentUrl("Chester+Magistrates");
  });

Scenario('verify appellant details after Hearing response received for ESA appeal', function*(I) {
  const date = yield I.calcAppealDate("hearingESAAppealCaseId", 0);
  yield * I.goToPageAfterSurnameValidation('/trackyourappeal/:id', 'hearingESAAppealCaseId');
  I.see('Ms. D Delta');
  I.see('Appeal reference number: SC444/44/44444');
  I.see(pageText.progressBar.screenReader.appeal.happened);
  I.see(pageText.progressBar.screenReader.dwpRespond.happened);
  I.see(pageText.progressBar.screenReader.hearingBooked.happened);
  I.see(pageText.progressBar.screenReader.hearing.happened);
  I.see('A hearing for your ESA appeal took place on '+date+' and a decision was made. You should receive the decision by post within 7 working days of the hearing.');
  I.see(pageText.status.hearing.content[1]);
 });

Scenario('verify appellant details after Hearing response received for PIP appeal', function*(I) {
  const date = yield I.calcAppealDate("hearingPIPAppealCaseId", 0);
  yield * I.goToPageAfterSurnameValidation('/trackyourappeal/:id', 'hearingPIPAppealCaseId');
  I.see('Ms. D Date');
  I.see('Appeal reference number: SC300/04/44444');
  I.see(pageText.progressBar.screenReader.appeal.happened);
  I.see(pageText.progressBar.screenReader.dwpRespond.happened);
  I.see(pageText.progressBar.screenReader.hearingBooked.happened);
  I.see(pageText.progressBar.screenReader.hearing.happened);
  I.see('A hearing for your PIP appeal took place on '+date+' and a decision was made. You should receive the decision by post within 7 working days of the hearing.');
  I.see(pageText.status.hearing.content[1]);
 });

Scenario('verify about your appeal section links', function*(I) {
  yield * I.goToPageAfterSurnameValidation('/trackyourappeal/:id', 'hearingESAAppealCaseId');
  I.see('About your appeal');
  I.click('What to expect at your hearing');
  I.see('What to expect at your hearing');
  I.amOnPage('/trackyourappeal/' + appealId);
  I.click('Claiming hearing expenses');
  I.see('Claiming expenses to attend your hearing');
  I.amOnPage('/trackyourappeal/' + appealId);
  I.click('Providing evidence to support your appeal');
  I.see('Providing evidence to support your appeal');
  I.amOnPage('/trackyourappeal/' + appealId);
  I.click('Contact us');
  I.see('Contact us');
  I.see('Cookie');
  I.click('Cookie');
  I.see('Cookie Policy');
});

Scenario('verify evidence page', function*(I) {
  yield * I.goToPageAfterSurnameValidation('/progress/:id/evidence', 'hearingESAAppealCaseId');
  I.see(pageText.evidence.provide.title);
  I.see(pageText.evidence.provide.medicalEvidence.heading);
  I.see(pageText.evidence.provide.oralEvidence.heading);
  I.see(pageText.evidence.provide.whereToSendEvidence.heading);
  I.see(pageText.evidence.provide.whereToSendEvidence.address[0]);
  I.see(pageText.evidence.provide.whereToSendEvidence.address[1]);
  I.see(pageText.evidence.provide.whereToSendEvidence.address[2]);
  I.see(pageText.evidence.provide.whereToSendEvidence.address[3]);
  I.see(pageText.evidence.provide.whereToSendEvidence.address[4]);
});

Scenario('verify what to expect at your hearing page for an ESA appeal', function*(I) {
  yield * I.goToPageAfterSurnameValidation('/progress/:id/abouthearing', 'hearingESAAppealCaseId');
  I.see(pageText.hearing.details.title);
  I.see('Your hearing is an opportunity for you to explain your appeal and get an impartial decision on your entitlement to Employment and Support Allowance (ESA). The tribunal is independent and will consider both sides of the appeal.');
  I.see('An ESA appeal hearing with a judge and a medical expert.');
  I.see(pageText.hearing.expectations.whenYouArrive.heading);
  I.see(pageText.hearing.expectations.whenYouArrive.content);
  I.see(pageText.hearing.expectations.theHearingRoom.heading);
  I.see(pageText.hearing.expectations.theHearingRoom.content);
  I.see(pageText.hearing.expectations.peopleAtHearing.heading);
  I.see(pageText.hearing.expectations.dwp.heading);
  I.see('A representative from DWP might be there. They are not on the panel and are there to speak on behalf of DWP. They won’t be the person who made the decision about your entitlement to ESA.');
  I.see(pageText.hearing.expectations.duringHearing.heading);
  I.see(pageText.hearing.expectations.gettingDecision.heading);
  I.see('The judge will explain whether you’re entitled to ESA and if so, at what level.');
  });

Scenario('verify expenses page', function*(I) {
  yield * I.goToPageAfterSurnameValidation('/progress/:id/expenses', 'hearingESAAppealCaseId');
  I.see(pageText.claimExpenses.title);
  I.see(pageText.claimExpenses.content);
});

Scenario('verify contact us page', function*(I) {
  yield * I.goToPageAfterSurnameValidation('/progress/:id/contactus', 'hearingESAAppealCaseId');
  I.see('Contact us');
  I.see(pageText.contactUs.title);
  I.see(pageText.contactUs.description);
  I.see(pageText.contactUs.openingHours);
  I.see(pageText.contactUs.englandWales.heading);
  I.see(pageText.contactUs.englandWales.phoneNumber);
  I.see(pageText.contactUs.scotland.heading);
  I.see(pageText.contactUs.scotland.phoneNumber);
});

Scenario('verify appellant details for lapsed revised state for ESA appeal', function*(I) {
  yield * I.goToPageAfterSurnameValidation('/trackyourappeal/:id', 'lapsedRevisedESAAppealCaseId');
  I.see('Ms. F Foxtrot');
  I.see('Appeal reference number: SC555/55/55555');
  I.see('DWP have told us they changed their decision on your entitlement to ESA in your favour. We’ve therefore closed this appeal. If you don’t agree with their new decision you can start a new appeal.');
  I.see(pageText.status.lapsedRevised.content[1]);

});

Scenario('verify appellant details for lapsed revised state for PIP appeal', function*(I) {
  yield * I.goToPageAfterSurnameValidation('/trackyourappeal/:id', 'lapsedRevisedPIPAppealCaseId');
  I.see('Ms. F Fruit');
  I.see('Appeal reference number: SC300/05/55555');
  I.see('DWP have told us they changed their decision on your entitlement to PIP in your favour. We’ve therefore closed this appeal. If you don’t agree with their new decision you can start a new appeal.');
  I.see(pageText.status.lapsedRevised.content[1]);

});

Scenario('verify appellant details for withdrawn state for ESA appeal', function*(I) {
  yield * I.goToPageAfterSurnameValidation('/trackyourappeal/:id', 'withdrawnESAAppealCaseId');
  I.see('Ms. I Iglo');
  I.see('Appeal reference number: SC666/66/66666');
  I.see(pageText.status.withdrawn.content[0]);
  I.see(pageText.status.withdrawn.content[1]);

});

Scenario('verify appellant details for withdrawn state for PIP appeal', function*(I) {
  yield * I.goToPageAfterSurnameValidation('/trackyourappeal/:id', 'withdrawnPIPAppealCaseId');
  I.see('Ms. I Iceberg');
  I.see('Appeal reference number: SC300/06/66666');
  I.see(pageText.status.withdrawn.content[0]);
  I.see(pageText.status.withdrawn.content[1]);

});

Scenario('verify appellant details for adjourned state', function*(I) {
  const date = yield I.calcAppealDate("adjurnedAppealCaseId", 7);
  yield * I.goToPageAfterSurnameValidation('/trackyourappeal/:id', 'adjurnedAppealCaseId');
  I.see('Ms. K Kilo');
  I.see('Appeal reference number: SC777/77/77777');
  I.see(pageText.progressBar.screenReader.appeal.happened);
  I.see(pageText.progressBar.screenReader.dwpRespond.happened);
  I.see(pageText.progressBar.screenReader.hearingBooked.due);
  I.see(pageText.progressBar.screenReader.hearing.due);
  I.see('The hearing for your appeal didn’t take place as scheduled. We’ve sent you a letter explaining why, which you should receive by '+date+'.')
});

Scenario('verify appellant details for postponed state for ESA appeal', function*(I) {
  yield * I.goToPageAfterSurnameValidation('/trackyourappeal/:id', 'postponedESAAppealCaseId');
  I.see('Ms. L Lena');
  I.see('Appeal reference number: SC888/88/88888');
  I.see(pageText.progressBar.screenReader.appeal.happened);
  I.see(pageText.progressBar.screenReader.dwpRespond.happened);
  I.see(pageText.progressBar.screenReader.hearingBooked.due);
  I.see(pageText.progressBar.screenReader.hearing.due);
  I.see('The hearing for your ESA benefit appeal has been postponed and will now take place on a different day.');
  I.see(pageText.status.postponed.content[1]);
});

Scenario('verify appellant details for postponed state PIP appeal', function*(I) {
  yield * I.goToPageAfterSurnameValidation('/trackyourappeal/:id', 'postponedPIPAppealCaseId');
  I.see('Ms. L Lemon');
  I.see('Appeal reference number: SC300/08/88888');
  I.see(pageText.progressBar.screenReader.appeal.happened);
  I.see(pageText.progressBar.screenReader.dwpRespond.happened);
  I.see(pageText.progressBar.screenReader.hearingBooked.due);
  I.see(pageText.progressBar.screenReader.hearing.due);
  I.see('The hearing for your PIP benefit appeal has been postponed and will now take place on a different day.');
  I.see(pageText.status.postponed.content[1]);
});

Scenario('verify appellant details for past hearing date state for ESA appeal', function*(I) {
  yield * I.goToPageAfterSurnameValidation('/trackyourappeal/:id', 'pastHearingDateESAAppealCaseId');
  I.see('Mr. M Miao');
  I.see('Appeal reference number: SC100/00/00000');
  I.see(pageText.progressBar.screenReader.appeal.happened);
  I.see(pageText.progressBar.screenReader.dwpRespond.happened);
  I.see(pageText.progressBar.screenReader.hearingBooked.due);
  I.see(pageText.progressBar.screenReader.hearing.due);
  I.see('We’re still trying to find a suitable time for your ESA benefit appeal. We’ll contact you as soon as we’ve scheduled it. We apologise for any inconvenience this may cause you.');

});

Scenario('verify appellant details for past hearing date state for PIP appeal', function*(I) {
  yield * I.goToPageAfterSurnameValidation('/trackyourappeal/:id', 'pastHearingDatePIPAppealCaseId');
  I.see('Mr. M Melon');
  I.see('Appeal reference number: SC300/10/00000');
  I.see(pageText.progressBar.screenReader.appeal.happened);
  I.see(pageText.progressBar.screenReader.dwpRespond.happened);
  I.see(pageText.progressBar.screenReader.hearingBooked.due);
  I.see(pageText.progressBar.screenReader.hearing.due);
  I.see('We’re still trying to find a suitable time for your PIP benefit appeal. We’ll contact you as soon as we’ve scheduled it. We apologise for any inconvenience this may cause you.');

});

Scenario('verify appellant details for dormant state for ESA appeal', function*(I) {
  const date = yield I.calcAppealDate("dormantESAAppealCaseId", 0);
  yield * I.goToPageAfterSurnameValidation('/trackyourappeal/:id', 'dormantESAAppealCaseId');
  I.see('Mr. N November');
  I.see('Appeal reference number: SC100/00/00001');
  I.see('A hearing for your ESA appeal took place on '+date+' and a decision was made. You should receive the decision by post within 7 working days of the hearing.');
  I.see(pageText.status.dormant.content[1]);
});

Scenario('verify appellant details for dormant state for PIP appeal', function*(I) {
  const date = yield I.calcAppealDate("dormantPIPAppealCaseId", 0);
  yield * I.goToPageAfterSurnameValidation('/trackyourappeal/:id', 'dormantPIPAppealCaseId');
  I.see('Mr. N Nut');
  I.see('Appeal reference number: SC300/11/00001');
  I.see('A hearing for your PIP appeal took place on '+date+' and a decision was made. You should receive the decision by post within 7 working days of the hearing.');
  I.see(pageText.status.dormant.content[1]);
});

Scenario('verify appellant details for Closed state', function*(I) {
  yield * I.goToPageAfterSurnameValidation('/trackyourappeal/:id', 'dormantClosedESAAppealCaseId');
  I.see('Mr. O Owl');
  I.see('Appeal reference number: SC100/00/00002');
  I.see('Your ESA benefit appeal is now closed.');
  I.see(pageText.status.closed.content[1]);
});

Scenario('verify appellant details for Closed state', function*(I) {
  yield * I.goToPageAfterSurnameValidation('/trackyourappeal/:id', 'dormantClosedPIPAppealCaseId');
  I.see('Mr. O Opel');
  I.see('Appeal reference number: SC300/12/00002');
  I.see('Your PIP benefit appeal is now closed.');
  I.see(pageText.status.closed.content[1]);
});

Scenario('verify appellant details for dwp respond overdue state', function*(I) {
  yield * I.goToPageAfterSurnameValidation('/trackyourappeal/:id', 'dwpRespondOverdueAppealCaseId');
  I.see('Mr. P Papa');
  I.see('Appeal reference number: SC100/00/00003');
  I.see(pageText.progressBar.screenReader.appeal.happened);
  I.see(pageText.progressBar.screenReader.dwpRespond.due);
  I.see(pageText.progressBar.screenReader.hearingBooked.due);
  I.see(pageText.progressBar.screenReader.hearing.due);
  I.see('We’ve written to them again to remind them. We’ll let you know when they respond.');
});


Scenario('verify appellant details for new hearing booked state', function*(I) {
  yield * I.goToPageAfterSurnameValidation('/trackyourappeal/:id', 'newHearingBookedAppealCaseId');
  I.see('Ms. Q Quack');
  I.see('Appeal reference number: SC100/00/00004');
  I.see(pageText.progressBar.screenReader.appeal.happened);
  I.see(pageText.progressBar.screenReader.dwpRespond.happened);
  I.see(pageText.progressBar.screenReader.hearingBooked.happened);
  I.see(pageText.progressBar.screenReader.hearing.due);
  I.see(pageText.status.newHearingBooked.content);
});
