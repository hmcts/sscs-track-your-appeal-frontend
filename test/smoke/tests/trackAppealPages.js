Feature('Track your Appeal Page Tests');

Scenario('verify appellant details after appeal received ', function*(I, Properties) {
  let result = yield I.postAppealReceivedEvent();
  I.amOnPage('/progress/' + result.appealId + '/trackyourappeal');
  I.see('MR Smoke Test');
  I.see('Appeal reference number: test/track/case/001', Properties.fields.form_hint_css_path);
  I.see('Appeal received. This is the current status of your appeal', Properties.fields.appeal_progbar_css_path);
  I.see('Latest update');
});

Scenario('verify appellant details after DWP response received', function*(I, Properties) {
  let result = yield I.postDWPResponseEvent();
  I.amOnPage('/progress/' + result.appealId + '/trackyourappeal');
  I.see('MR Smoke Test');
  I.see('Appeal reference number: test/track/case/001', Properties.fields.form_hint_css_path);
  I.see('Appeal received. This step is complete.', Properties.fields.appeal_progbar_css_path);
  I.see('DWP respond to your appeal. This is the current status of your appeal.', Properties.fields.dwp_respond_progbar_css_path);
  I.see('Latest update');
  I.click(Properties.fields.view_previous_updates_link_css_path, 'View previous updates');
  I.see('Appeal received', Properties.fields.sub_headings_h3_css_path);
  I.see('12 December 2016', Properties.fields.sub_headings_h3_css_path);
});

Scenario('verify appellant details after Hearing response received', function*(I, Properties) {
  let result = yield I.postHearingBookedEvent();
  I.amOnPage('/progress/' + result.appealId + '/trackyourappeal');
  I.see('MR Smoke Test');
  I.see('Appeal reference number: test/track/case/001', Properties.fields.form_hint_css_path);
  I.see('Appeal received. This step is complete.', Properties.fields.appeal_progbar_css_path);
  I.see('DWP respond to your appeal. This step is complete.', Properties.fields.dwp_respond_progbar_css_path);
  I.see('Hearing booked. This is the current status of your appeal.', Properties.fields.hearing_booked_progbar_css_path);
  I.see('Latest update');
  I.click(Properties.fields.view_previous_updates_link_css_path, 'View previous updates');
  I.see('Appeal received', Properties.fields.sub_headings_h3_css_path);
  I.see('12 December 2016', Properties.fields.sub_headings_h3_css_path);
  I.see('DWP response', Properties.fields.sub_headings_h3_css_path);
  I.see('13 December 2016', Properties.fields.sub_headings_h3_css_path);
});

Scenario('verify appellant details after Hearing booked', function*(I, Properties) {
  let result = yield I.postHearingEvent();
  I.amOnPage('/progress/' + result.appealId + '/trackyourappeal');
  I.see('MR Smoke Test');
  I.see('Appeal reference number: test/track/case/001', Properties.fields.form_hint_css_path);
  I.see('Appeal received. This step is complete.', Properties.fields.appeal_progbar_css_path);
  I.see('DWP respond to your appeal. This step is complete.', Properties.fields.dwp_respond_progbar_css_path);
  I.see('Hearing booked. This step is complete.', Properties.fields.hearing_booked_progbar_css_path);
  I.see('Hearing for your appeal. This is the current status of your appeal.', Properties.fields.hearing_progbar_css_path);
  I.see('Latest update');
  I.click(Properties.fields.view_previous_updates_link_css_path, 'View previous updates');
  I.see('Appeal received', Properties.fields.sub_headings_h3_css_path);
  I.see('12 December 2016', Properties.fields.sub_headings_h3_css_path);
  I.see('DWP response', Properties.fields.sub_headings_h3_css_path);
  I.see('13 December 2016', Properties.fields.sub_headings_h3_css_path);
  I.see('Hearing booked', Properties.fields.sub_headings_h3_css_path);
  I.see('14 December 2016', Properties.fields.sub_headings_h3_css_path);
});

Scenario('verify about your appeal section links', function*(I, Properties) {
  let appeal_id = yield I.getAppealId();
  I.amOnPage('/progress/' + appeal_id + '/trackyourappeal');
  I.see('About your appeal');
  I.click('What to expect at your hearing');
  I.see('What to expect at your hearing');
  I.amOnPage('/progress/' + appeal_id + '/trackyourappeal');
  I.click('Claiming hearing expenses');
  I.see('Claiming expenses to attend your hearing');
  I.amOnPage('/progress/' + appeal_id + '/trackyourappeal');
  I.click('Providing evidence to support your appeal');
  I.see('Providing evidence to support your appeal');
});

Scenario('verify evidence page', function*(I, Properties) {
  let appeal_id = yield I.getAppealId();
  I.amOnPage('/progress/' + appeal_id + '/evidence');
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
  let appeal_id = yield I.getAppealId();
  I.amOnPage('/progress/' + appeal_id + '/abouthearing');
  I.see('What to expect at your hearing');
  I.see('When you arrive', Properties.fields.sub_headings_h2_css_path);
  I.see('The hearing room', Properties.fields.sub_headings_h2_css_path);
  I.see('The people at your hearing', Properties.fields.sub_headings_h2_css_path);
  I.see('The DWP', Properties.fields.sub_headings_h2_css_path);
  I.see('During your hearing', Properties.fields.sub_headings_h2_css_path);
  I.see('Getting a decision', Properties.fields.sub_headings_h2_css_path);
});

Scenario('verify expenses page', function*(I, Properties) {
  let appeal_id = yield I.getAppealId();
  I.amOnPage('/progress/' + appeal_id + '/expenses');
  I.see('Claiming expenses to attend your hearing');
  I.see('You may be able to claim back some of the money you spend on attending your hearing.');
});
