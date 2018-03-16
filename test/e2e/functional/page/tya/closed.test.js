const { environment } = require('test/e2e/helpers/nunjucksHelper');
const { appeal } = require('test/mock/data/closed');
const { closed } = require('public/locale/en').status;

const env = environment();

Feature('TYA - Closed');

Before((I) => {
  I.enterSurnameAndSubmitAndSeeTYA(appeal);
});

Scenario('Verify closed appeal details, no progress bar and content', function*(I) {

  I.seeAppealDetails(appeal);
  I.dontSeeAProgressBar();

  // Content specific to Closed.
  I.see(env.renderString(closed.content[0], { benefitType: appeal.benefitType }));
  I.see(closed.content[1]);
});
