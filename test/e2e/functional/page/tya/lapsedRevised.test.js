const { env } = require('test/e2e/helpers/nunjucksHelper');
const { appeal } = require('test/mock/data/lapsedRevised');
const { common, status } = require('public/locale/en');

Feature('TYA - Lapsed Revised');

Before(I => {
  I.enterSurnameAndSubmitAndSeeTYA(appeal);
});

xScenario('Verify lapsed revised appeal details, no progress bar and content', I => {
  I.seeAppealDetails(appeal);
  I.dontSeeAProgressBar();

  // Content
  I.see(common.latestUpdate);
  I.see(env.renderString(status.lapsedRevised.content[0], { benefitType: appeal.benefitType }));
});
