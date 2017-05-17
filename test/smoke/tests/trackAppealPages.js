Feature('Track your Appeal Page Tests');

Scenario('verify appellant details after Appeal Received', function*(I, Properties) {
  let appealId = yield I.retrieveAppealNumberForAppealReceivedAppealCaseID();
  I.amOnPage('/progress/' + appealId + '/trackyourappeal');
  I.see('Mr. A Alpha');
  I.see('Appeal reference number: SC111/11/1111', Properties.fields.form_hint_css_path);
  I.see('Appeal received. This is the current status of your appeal', Properties.fields.appeal_progbar_css_path);
  I.see('Latest update');
  I.see('We’ve told the DWP that you’ve appealed against their decision. They should respond before 06 April 2017. We’ll contact you and explain the next steps when they’ve replied.')
});

Scenario('verify appellant details after DWP response received', function*(I, Properties) {
  let appealId = yield I.retrieveAppealNumberForDwpAppealCaseID();
  I.amOnPage('/progress/' + appealId + '/trackyourappeal');
  I.see('Mr. B Bravo');
  I.see('Appeal reference number: SC222/22/22222', Properties.fields.form_hint_css_path);
  I.see('Appeal received. This step is complete.', Properties.fields.appeal_progbar_css_path);
  I.see('DWP respond to your appeal. This is the current status of your appeal.', Properties.fields.dwp_respond_progbar_css_path);
  I.see('Latest update');
  I.click(Properties.fields.view_previous_updates_link_css_path, 'View previous updates');
  I.see('Appeal received', Properties.fields.sub_headings_h3_css_path);
  I.see('05 January 2017', Properties.fields.sub_headings_h3_css_path);
  I.see('DWP response', Properties.fields.sub_headings_h3_css_path);
  I.see('22 January 2015', Properties.fields.sub_headings_h3_css_path);
  I.click('Providing evidence to support your appeal');
  I.see('Providing evidence to support your appeal');
});

Scenario('verify appellant details after Hearing response received', function*(I, Properties) {
  let appealId = yield I.retrieveAppealNumberForHearingBookedAppealCaseID();
  I.amOnPage('/progress/' + appealId + '/trackyourappeal');
  I.see('Mr. C Charlie');
  I.see('Appeal reference number: SC333/33/33333', Properties.fields.form_hint_css_path);
  I.see('Appeal received. This step is complete.', Properties.fields.appeal_progbar_css_path);
  I.see('DWP respond to your appeal. This step is complete.', Properties.fields.dwp_respond_progbar_css_path);
  I.see('Hearing booked. This is the current status of your appeal.', Properties.fields.hearing_booked_progbar_css_path);
  I.see('Latest update');
  I.click(Properties.fields.view_previous_updates_link_css_path, 'View previous updates');
  I.see('Appeal received', Properties.fields.sub_headings_h3_css_path);
  I.see('24 October 2013', Properties.fields.sub_headings_h3_css_path);
  I.see('DWP response', Properties.fields.sub_headings_h3_css_path);
  I.see('24 October 2013', Properties.fields.sub_headings_h3_css_path);
  I.click('Check your hearing details');
  I.see('Check your hearing details');
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
  I.see('Providing evidence to support your appeal');
  I.see('Medical evidence', Properties.fields.sub_headings_h2_css_path);
  I.see('Oral evidence', Properties.fields.sub_headings_h2_css_path);
  I.see('Where to send your evidence', Properties.fields.sub_headings_h2_css_path);
  I.see('Liverpool Social Security and Child Support Tribunal');
  I.see('36 Dale Street');
  I.see('Liverpool');
  I.see('Merseyside');
  I.see('L2 5UZ');
});

Scenario('verify what to expect at your hearing page', function*(I, Properties) {
  let appealId = yield I.retrieveAppealNumberForHearingBookedAppealCaseID();
  I.amOnPage('/progress/' + appealId + '/abouthearing');
  I.see('What to expect at your hearing');
  I.see('When you arrive', Properties.fields.sub_headings_h2_css_path);
  I.see('The hearing room', Properties.fields.sub_headings_h2_css_path);
  I.see('The people at your hearing', Properties.fields.sub_headings_h2_css_path);
  I.see('The DWP', Properties.fields.sub_headings_h2_css_path);
  I.see('During your hearing', Properties.fields.sub_headings_h2_css_path);
  I.see('Getting a decision', Properties.fields.sub_headings_h2_css_path);
});

Scenario('verify expenses page', function*(I, Properties) {
  let appealId = yield I.retrieveAppealNumberForHearingBookedAppealCaseID();
  I.amOnPage('/progress/' + appealId + '/expenses');
  I.see('Claiming expenses to attend your hearing');
  I.see('You may be able to claim back some of the money you spend on attending your hearing.');
});

Scenario('verify appellant details for unmapped state', function*(I, Properties) {
  let appealId = yield I.retrieveAppealNumberForUnmappedCaseID();
  I.amOnPage('/progress/' + appealId + '/trackyourappeal');
  I.dontSee('Ms. L Lena');
});
