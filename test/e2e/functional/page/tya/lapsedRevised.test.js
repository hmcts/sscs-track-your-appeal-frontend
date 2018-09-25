const { env } = require('test/e2e/helpers/nunjucksHelper');
const { appeal } = require('test/mock/data/oral/lapsedRevised');
const { common, status } = require('public/locale/en');

Feature('TYA - Lapsed Revised');

Before(I => {
  I.enterSurnameAndSubmitAndSeeTYA(appeal);
});
git
Scenario('Verify lapsed revised appeal details, no progress bar and content', I => {
  I.seeAppealDetails(appeal);
  I.dontSeeAProgressBar();

  // Content
  I.see(common.latestUpdate);
  I.see(env.renderString(status.lapsedRevised.oral.content[0], { benefitType: appeal.benefitType }));
});
