const { errors } = require('app/assets/locale/en');

Feature('Not Found');

Scenario('Verify HTTP 404 error page', (I) => {

  I.amOnPage('/nonexistent');
  I.see(errors.error404.heading);

});
