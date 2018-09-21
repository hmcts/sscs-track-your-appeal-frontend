const { env } = require('test/e2e/helpers/nunjucksHelper');
const { appeal } = require('test/mock/data/paper/dormant');
const { common, status } = require('public/locale/en');

Feature('TYA - Dormant paper case (completed)');

Before(I => {
  I.enterSurnameAndSubmitAndSeeTYA(appeal);
});

xScenario('Verify dormant appeal details, progress bar status, screen reader text and content', I => {
  I.seeAppealDetails(appeal);
  I.seeInSource('<div class="appeal-received active paper">');
  I.seeInSource('<div class="dwp-respond active paper">');
  // todo fix this
  I.seeInSource('<div class="hearing-booked active paper">');
  I.seeScreenReaderTextAtHearing();

  // Content
  I.see(common.latestUpdate);
  status.dormant.paper.content.forEach(content => {
    I.see(env.renderString(content, {
      benefitType: appeal.benefitType,
      date: appeal.latestEvents[0].date
    }));
  });
});
