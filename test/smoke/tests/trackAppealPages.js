const pageText = require('public/locale/en');
const dbProperties = require('../props/properties').dataBaseFields;

Feature('Track your Appeal Page Tests');

Scenario('verify appellant details after Appeal Received', function*(I) {
  let appealId = yield I.retrieveAppealNumber(dbProperties.appealReceivedAppealCaseId);
  let date = yield I.calculateDate(dbProperties.appealReceivedAppealCaseId,35);
  I.amOnPage('/progress/' + appealId + '/trackyourappeal');
  I.see('Mr. A Alpha');
  I.see('Appeal reference number: SC111/11/1111');
  I.see(pageText.progressBar.screenReader.appeal.happening);
  I.see(pageText.common.latestUpdate);
  I.see('We’ve told DWP that you’ve appealed against their decision. They should respond before '+date+'. We’ll contact you and explain the next steps when they’ve replied.')
});

Scenario('verify appellant details after DWP response received', function*(I, Properties) {
  let appealId = yield I.retrieveAppealNumber(dbProperties.dwpAppealCaseId);
  I.amOnPage('/progress/' + appealId + '/trackyourappeal');
  I.see('Mr. B Bravo');
  I.see('Appeal reference number: SC222/22/22222');
  I.see(pageText.progressBar.screenReader.appeal.happened);
  I.see(pageText.progressBar.screenReader.dwpRespond.happening);
  I.see(pageText.common.latestUpdate);
  I.click(Properties.fields.view_previous_updates_link_css_path, 'View previous updates');
  I.see(pageText.status.appealReceived.heading);
  I.see(pageText.evidence.notReceived);
  I.see('05 January 2017', Properties.fields.sub_headings_h3_css_path);
  I.click('Providing evidence to support your appeal');
  I.see('Providing evidence to support your appeal');


});

Scenario('verify appellant details after Hearing Booked', function*(I, Properties) {
  let appealId = yield I.retrieveAppealNumber(dbProperties.hearingBookedAppealCaseId);
  I.amOnPage('/progress/' + appealId + '/trackyourappeal');
  I.see('Mr. C Charlie');
  I.see('Appeal reference number: SC333/33/33333');
  I.see(pageText.progressBar.screenReader.appeal.happened);
  I.see(pageText.progressBar.screenReader.dwpRespond.happened);
  I.see(pageText.progressBar.screenReader.hearingBooked.happening);
  I.see(pageText.common.latestUpdate);
  I.click(Properties.fields.view_previous_updates_link_css_path, 'View previous updates');
  I.see(pageText.status.appealReceived.heading);
  I.see('24 June 2017', Properties.fields.sub_headings_h3_css_path);
  I.see(pageText.status.dwpRespond.heading);
  I.see('24 June 2017', Properties.fields.sub_headings_h3_css_path);
  I.click(pageText.hearingDetails.checkDetails);
  I.see(pageText.hearingDetails.checkDetails);
});

Scenario('verify hearing details', function*(I, Properties) {
  let appealId = yield I.retrieveAppealNumber(dbProperties.hearingBookedAppealCaseId);
  I.amOnPage('/progress/' + appealId + '/hearingdetails');
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
  I.seeInCurrentUrl("CH1+2XA");
  });

Scenario('verify appellant details after Hearing response received', function*(I) {
  let appealId = yield I.retrieveAppealNumber(dbProperties.hearingAppealCaseId);
  let date = yield I.calculateDate(dbProperties.hearingAppealCaseId,0);
  I.amOnPage('/progress/' + appealId + '/trackyourappeal');
  I.see('Ms. D Delta');
  I.see('Appeal reference number: SC444/44/44444');
  I.see('A hearing for your ESA appeal took place on '+date+' and a decision was made. You should receive the decision by post within 7 working days of the hearing.');
  I.see(pageText.status.hearing.content[1]);
 });


Scenario('verify about your appeal section links', function*(I) {
  let appealId = yield I.retrieveAppealNumber(dbProperties.hearingAppealCaseId);
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
  I.amOnPage('/progress/' + appealId + '/trackyourappeal');
  I.click('Contact us');
  I.see('Contact us');
  I.see('Cookie');
  I.click('Cookie');
  I.see('Cookie Policy');
});

Scenario('verify evidence page', function*(I) {
  let appealId = yield I.retrieveAppealNumber(dbProperties.hearingAppealCaseId);
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

Scenario('verify what to expect at your hearing page', function*(I) {
  let appealId = yield I.retrieveAppealNumber(dbProperties.hearingAppealCaseId);
  I.amOnPage('/progress/' + appealId + '/abouthearing');
  I.see(pageText.hearing.details.title);
  I.see(pageText.hearing.expectations.whenYouArrive.heading);
  I.see(pageText.hearing.expectations.whenYouArrive.content);
  I.see(pageText.hearing.expectations.theHearingRoom.heading);
  I.see(pageText.hearing.expectations.theHearingRoom.content);
  I.see(pageText.hearing.expectations.theHearingRoom.caption);
  I.see(pageText.hearing.expectations.peopleAtHearing.heading);
  I.see(pageText.hearing.expectations.dwp.heading);
  I.see(pageText.hearing.expectations.duringHearing.heading);
  I.see(pageText.hearing.expectations.gettingDecision.heading);
  });

Scenario('verify expenses page', function*(I) {
  let appealId = yield I.retrieveAppealNumber(dbProperties.hearingAppealCaseId);
  I.amOnPage('/progress/' + appealId + '/expenses');
  I.see(pageText.claimExpenses.title);
  I.see(pageText.claimExpenses.content);
});

Scenario('verify contact us page', function*(I) {
  let appealId = yield I.retrieveAppealNumber(dbProperties.hearingAppealCaseId);
  I.amOnPage('/progress/' + appealId + '/contactus');
  I.see('Contact us');
  I.see(pageText.contactUs.title);
  I.see(pageText.contactUs.description);
  I.see(pageText.contactUs.openingHours);
  I.see(pageText.contactUs.englandWales.heading);
  I.see(pageText.contactUs.englandWales.phoneNumber);
  I.see(pageText.contactUs.scotland.heading);
  I.see(pageText.contactUs.scotland.phoneNumber);
});

Scenario('verify appellant details for lapsed revised state', function*(I) {
  let appealId = yield I.retrieveAppealNumber(dbProperties.lapsedRevisedAppealCaseId);
  I.amOnPage('/progress/' + appealId + '/trackyourappeal');
  I.see('Ms. F Foxtrot');
  I.see('Appeal reference number: SC555/55/55555');
  I.see(pageText.status.lapsedRevised.content[0]);
  I.see(pageText.status.lapsedRevised.content[1]);

});

Scenario('verify appellant details for withdrawn state', function*(I) {
  let appealId = yield I.retrieveAppealNumber(dbProperties.withdrawnAppealCaseId);
  I.amOnPage('/progress/' + appealId + '/trackyourappeal');
  I.see('Ms. I Iglo');
  I.see('Appeal reference number: SC666/66/66666');
  I.see(pageText.status.withdrawn.content[0]);
  I.see(pageText.status.withdrawn.content[1]);

});


Scenario('verify appellant details for adjurned state', function*(I) {
  let appealId = yield I.retrieveAppealNumber(dbProperties.adjurnedAppealCaseId);
  let date = yield I.calculateDate(dbProperties.adjurnedAppealCaseId,7);
  I.amOnPage('/progress/' + appealId + '/trackyourappeal');
  I.see('Ms. K Kilo');
  I.see('Appeal reference number: SC777/77/77777');
  I.see('The hearing for your appeal didn’t take place as scheduled. We’ve sent you a letter explaining why, which you should receive by '+date+'.')
});

Scenario('verify appellant details for postponed state', function*(I) {
  let appealId = yield I.retrieveAppealNumber(dbProperties.postponedAppealCaseId);
  let date = yield I.calculateDate(dbProperties.postponedAppealCaseId,42);
  I.amOnPage('/progress/' + appealId + '/trackyourappeal');
  I.see('Ms. L Lena');
  I.see('Appeal reference number: SC888/88/88888');
  I.see(pageText.status.postponed.content[0]);
  I.see('We’ll book a new hearing for your appeal. We’ll contact you by '+date+' with the details.')
});

Scenario('verify appellant details for past hearing date state', function*(I) {
  let appealId = yield I.retrieveAppealNumber(dbProperties.pastHearingDateAppealCaseId);
  I.amOnPage('/progress/' + appealId + '/trackyourappeal');
  I.see('Mr. M Miao');
  I.see('Appeal reference number: SC100/00/00000');
  I.see(pageText.status.pastHearingBooked.content);

});

Scenario('verify appellant details for dormant state', function*(I) {
  let appealId = yield I.retrieveAppealNumber(dbProperties.dormantAppealCaseId);
  I.amOnPage('/progress/' + appealId + '/trackyourappeal');
  I.see('Mr. N November');
  I.see('Appeal reference number: SC100/00/00001');
  //I.see(pageText.status.dormant.content[0]);
  I.see(pageText.status.dormant.content[1]);
});

Scenario('verify appellant details for Closed state', function*(I) {
  let appealId = yield I.retrieveAppealNumber(dbProperties.dormantClosedAppealCaseId);
  I.amOnPage('/progress/' + appealId + '/trackyourappeal');
  I.see('Mr. O Owl');
  I.see('Appeal reference number: SC100/00/00002');
  I.see(pageText.status.closed.content[0]);
  I.see(pageText.status.closed.content[1]);
});

Scenario('verify appellant details for dwp respond overdue state', function*(I) {
  let appealId = yield I.retrieveAppealNumber(dbProperties.dwpRespondOverdueAppealCaseId);
  I.amOnPage('/progress/' + appealId + '/trackyourappeal');
  I.see('Mr. P Papa');
  I.see('Appeal reference number: SC100/00/00003');
  I.see('We’ve written to them again to remind them. We’ll let you know when they respond.');
});


Scenario('verify appellant details for new hearing booked state', function*(I) {
  let appealId = yield I.retrieveAppealNumber(dbProperties.newHearingBookedAppealCaseId);
  I.amOnPage('/progress/' + appealId + '/trackyourappeal');
  I.see('Ms. Q Quack');
  I.see('Appeal reference number: SC100/00/00004');
  I.see(pageText.status.newHearingBooked.content);
});
