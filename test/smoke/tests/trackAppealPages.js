const pageText = require('public/locale/en');

Feature('Track your Appeal Page Tests');

Scenario('verify appellant details after Appeal Received', function*(I, Properties) {
  let appealId = yield I.retrieveAppealNumberForAppealReceivedAppealCaseID();
  I.amOnPage('/progress/' + appealId + '/trackyourappeal');
  I.see('Mr. A Alpha');
  I.see('Appeal reference number: SC111/11/1111', Properties.fields.form_hint_css_path);
  I.see(pageText.progressBar.screenReader.appeal.happening);
  I.see(pageText.common.latestUpdate);
  I.see('We’ve told the DWP that you’ve appealed against their decision. They should respond before 29 June 2017. We’ll contact you and explain the next steps when they’ve replied.')
});

Scenario('verify appellant details after DWP response received', function*(I, Properties) {
  let appealId = yield I.retrieveAppealNumberForDwpAppealCaseID();
  I.amOnPage('/progress/' + appealId + '/trackyourappeal');
  I.see('Mr. B Bravo');
  I.see('Appeal reference number: SC222/22/22222');
  I.see(pageText.progressBar.screenReader.appeal.happened);
  I.see(pageText.progressBar.screenReader.dwpRespond.happening);
  I.see(pageText.common.latestUpdate);
  I.click(Properties.fields.view_previous_updates_link_css_path, 'View previous updates');
  I.see(pageText.status.appealReceived.heading);
  I.see('05 January 2017', Properties.fields.sub_headings_h3_css_path);
  I.click('Providing evidence to support your appeal');
  I.see('Providing evidence to support your appeal');
});

Scenario('verify appellant details after Hearing Booked', function*(I, Properties) {
  let appealId = yield I.retrieveAppealNumberForHearingBookedAppealCaseID();
  I.amOnPage('/progress/' + appealId + '/trackyourappeal');
  I.see('Mr. C Charlie');
  I.see('Appeal reference number: SC333/33/33333');
  I.see(pageText.progressBar.screenReader.appeal.happened);
  I.see(pageText.progressBar.screenReader.dwpRespond.happened);
  I.see(pageText.progressBar.screenReader.hearingBooked.happening);
  I.see(pageText.common.latestUpdate);
  I.click(Properties.fields.view_previous_updates_link_css_path, 'View previous updates');
  I.see(pageText.status.appealReceived.heading);
  I.see('24 October 2013', Properties.fields.sub_headings_h3_css_path);
  I.see(pageText.status.dwpRespond.heading);
  I.see('24 October 2013', Properties.fields.sub_headings_h3_css_path);
  I.click(pageText.hearingDetails.checkDetails);
  I.see(pageText.hearingDetails.checkDetails);
});

Scenario('verify appellant details after Hearing response received', function*(I, Properties) {
  let appealId = yield I.retrieveAppealNumberForHearingAppealCaseID();
  I.amOnPage('/progress/' + appealId + '/trackyourappeal');
  I.see('Ms. D Delta');
  I.see('Appeal reference number: SC444/44/44444');
  I.see(pageText.status.hearing.content[1]);
});


Scenario('verify about your appeal section links', function*(I, Properties) {
  let appealId = yield I.retrieveAppealNumberForHearingBookedAppealCaseID();
  I.amOnPage('/progress/' + appealId + '/trackyourappeal');
  I.see('About your appeal');
  I.click('What to expect at your hearing');
  I.see('What to expect at your hearing');
  I.amOnPage('/progress/' + appealId + '/trackyourappeal');
  I.click('Claiming hearing expenses');
  I.see('Claiming expenses to attend your hearing');
  I.amOnPage('/progress/' + appealId + '/trackyourappeal');
  I.click('Providing evidence to support your appeal');
  I.see('Providing evidence to support your appeal');
});

Scenario('verify evidence page', function*(I, Properties) {
  let appealId = yield I.retrieveAppealNumberForHearingBookedAppealCaseID();
  I.amOnPage('/progress/' + appealId + '/evidence');
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

Scenario('verify what to expect at your hearing page', function*(I, Properties) {
  let appealId = yield I.retrieveAppealNumberForHearingBookedAppealCaseID();
  I.amOnPage('/progress/' + appealId + '/abouthearing');
  I.see(pageText.hearing.details.title);
  I.see(pageText.hearing.expectations.whenYouArrive.heading);
  I.see(pageText.hearing.expectations.whenYouArrive.content);
  I.see(pageText.hearing.expectations.theHearingRoom.heading);
  I.see(pageText.hearing.expectations.theHearingRoom.content);
  I.see(pageText.hearing.expectations.peopleAtHearing.heading);
  I.see(pageText.hearing.expectations.dwp.heading);
  I.see(pageText.hearing.expectations.duringHearing.heading);
  I.see(pageText.hearing.expectations.gettingDecision.heading);
});

Scenario('verify expenses page', function*(I, Properties) {
  let appealId = yield I.retrieveAppealNumberForHearingBookedAppealCaseID();
  I.amOnPage('/progress/' + appealId + '/expenses');
  I.see(pageText.claimExpenses.title);
  I.see(pageText.claimExpenses.content);
});

Scenario('verify contact us page', function*(I, Properties) {
  let appealId = yield I.retrieveAppealNumberForHearingBookedAppealCaseID();
  I.amOnPage('/progress/' + appealId + '/contactus');
  I.see('Contact us');
  I.see(pageText.contactUs.title);
  I.see(pageText.contactUs.description);
  I.see(pageText.contactUs.openingHours);
  I.see(pageText.contactUs.englandWales.heading);
  I.see(pageText.contactUs.englandWales.phoneNumber);
  I.see(pageText.contactUs.scotland.heading);
  I.see(pageText.contactUs.scotland.phoneNumber);
  I.see(pageText.contactUs.regionalOffice.address[0]);
  I.see(pageText.contactUs.regionalOffice.address[1]);
  I.see(pageText.contactUs.regionalOffice.address[2]);
  I.see(pageText.contactUs.regionalOffice.address[3]);
  I.see(pageText.contactUs.regionalOffice.address[4]);
  I.see(pageText.contactUs.regionalOffice.address[5]);
});

Scenario('verify appellant details for lapsed revised state', function*(I, Properties) {
  let appealId = yield I.retrieveAppealNumberForLapsedRevisedCaseID();
  I.amOnPage('/progress/' + appealId + '/trackyourappeal');
  I.see('Ms. F Foxtrot');
  I.see('Appeal reference number: SC555/55/55555');
  I.see(pageText.status.lapsedRevised.content[0]);
  I.see(pageText.status.lapsedRevised.content[1]);

});

Scenario('verify appellant details for withdrawn state', function*(I, Properties) {
  let appealId = yield I.retrieveAppealNumberForWithdrawnCaseID();
  I.amOnPage('/progress/' + appealId + '/trackyourappeal');
  I.see('Ms. I Iglo');
  I.see('Appeal reference number: SC666/66/66666');
  I.see(pageText.status.withdrawn.content[0]);
  I.see(pageText.status.withdrawn.content[1]);

});


Scenario('verify appellant details for adjurned state', function*(I, Properties) {
  let appealId = yield I.retrieveAppealNumberForAdjurnedCaseID();
  I.amOnPage('/progress/' + appealId + '/trackyourappeal');
  I.see('Ms. K Kilo');
  I.see('Appeal reference number: SC777/77/77777');
  I.see('The hearing for your appeal didn’t take place as scheduled. We’ve sent you a letter explaining why, which you should receive by 09 March 2017.')
});

Scenario('verify appellant details for postponed state', function*(I, Properties) {
  let appealId = yield I.retrieveAppealNumberForPostponedCaseID();
  I.amOnPage('/progress/' + appealId + '/trackyourappeal');
  I.see('Ms. L Lena');
  I.see('Appeal reference number: SC888/88/88888');
  I.see(pageText.status.postponed.content[0]);
  I.see('We’ll book a new hearing for your appeal. We’ll contact you by 13 April 2017 with the details.')
});

Scenario('verify appellant details for past hearing date state', function*(I, Properties) {
  let appealId = yield I.retrieveAppealNumberForPastHearingDateCaseID();
  I.amOnPage('/progress/' + appealId + '/trackyourappeal');
  I.see('Mr. M Miao');
  I.see('Appeal reference number: SC100/00/00000');
  I.see(pageText.status.pastHearingBooked.content);

});

Scenario('verify appellant details for dormant state', function*(I, Properties) {
  let appealId = yield I.retrieveAppealNumberForDormantCaseID();
  I.amOnPage('/progress/' + appealId + '/trackyourappeal');
  I.see('Mr. N November');
  I.see('Appeal reference number: SC100/00/00001');
  I.see(pageText.status.dormant.content[0]);
  I.see(pageText.status.dormant.content[1]);
});

Scenario('verify appellant details for Closed state', function*(I, Properties) {
  let appealId = yield I.retrieveAppealNumberForDormantClosedCaseID();
  I.amOnPage('/progress/' + appealId + '/trackyourappeal');
  I.see('Mr. O Owl');
  I.see('Appeal reference number: SC100/00/00002');
  I.see(pageText.status.closed.content[0]);
  I.see(pageText.status.closed.content[1]);
});

Scenario('verify appellant details for dwp respond overdue state', function*(I, Properties) {
  let appealId = yield I.retrieveAppealNumberForDwpOverdueRespondCaseID();
  I.amOnPage('/progress/' + appealId + '/trackyourappeal');
  I.see('Mr. P Papa');
  I.see('Appeal reference number: SC100/00/00003');
  I.see('We’ve written to them again to remind them. We’ll let you know when they respond.');
});


Scenario('verify appellant details for new hearing booked state', function*(I, Properties) {
  let appealId = yield I.retrieveAppealNumberForNewHearingBookedCaseID();
  I.amOnPage('/progress/' + appealId + '/trackyourappeal');
  I.see('Ms. Q Quack');
  I.see('Appeal reference number: SC100/00/00004');
  I.see(pageText.status.newHearingBooked.content);
});
