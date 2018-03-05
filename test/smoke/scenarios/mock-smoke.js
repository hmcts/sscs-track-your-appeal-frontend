Feature('TYA Surname');

Scenario('Verify the page redirects to /validate-surname', function*(I) {
  I.amOnPage('/trackyourappeal/123');
  I.see('Enter your last name');
  I.seeCurrentUrlEquals('/validate-surname/123');
});
