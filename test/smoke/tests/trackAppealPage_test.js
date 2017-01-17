const appeal_id = 'urkdug';
Feature('Track your Appeal Page Tests');

Scenario('verify appellant details ', (I, Properties) => {
  I.amOnPage('/progress/' + appeal_id + '/trackyourappeal');
  I.wait(10);
  I.see('Mr Paul Gain');
  I.see('Appeal reference number: SC012/34/56789', Properties.fields.form_hint_css_path);
});

Scenario('verify appellant status and updates', (I, Properties) => {
  I.amOnPage('/progress/' + appeal_id + '/trackyourappeal')
  I.see('Appeal', {css: '.appeal-received'});
  I.see('Latest update');
  I.click({css: 'i.fa.fa-caret-right'}, 'View previous updates');
  I.see('Appeal received', {css: 'h4.bold-small'});
  I.see('16 November 2016', {css: 'h4.bold-small'});
  I.see('DWP response', {css: 'h4.bold-small'});
  I.see('12 November 2016', {css: 'h4.bold-small'});
  I.see('Hearing booked', {css: 'h4.bold-small'});
  I.see('14 November 2016', {css: 'h4.bold-small'});
});

Scenario('verify appellant status and updates', (I, Properties) => {
  I.amOnPage('/progress/' + appeal_id + '/trackyourappeal')
  I.see('About your appeal');
  I.seeInSource('<a href="/progress/urkdug/abouthearing">What to expect at your hearing</a>');
  I.click('What to expect at your hearing');
});
