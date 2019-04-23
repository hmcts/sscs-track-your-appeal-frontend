const { env } = require('test/e2e/helpers/nunjucksHelper');
const { appeal } = require('test/mock/data/oral/closed');
const { common, status } = require('public/locale/en');

Feature('TYA - Closed');

Before(I => {
  I.enterSurnameAndSubmitAndSeeTYA(appeal);
});

Scenario('Verify closed appeal details, no progress bar and content @appealClosed', I => {
  I.seeAppealDetails(appeal);
  I.dontSeeAProgressBar();

  // Content.
  I.see(common.latestUpdate);
  status.closed.oral.content.forEach(content => {
    I.see(env.renderString(content, { benefitType: appeal.benefitType }));
  });
});
