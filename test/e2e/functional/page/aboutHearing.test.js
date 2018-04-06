const { env } = require('test/e2e/helpers/nunjucksHelper');
const { appeal } = require('test/mock/data/appealReceived');
const { hearing } = require('app/assets/locale/en');

const benefitType = { benefitType: appeal.benefitType };

Feature('About hearing');

Before(I => {
  I.enterSurnameAndSubmitAndSeeTYA(appeal);
});

Scenario('Verify the dynamic content of the /abouthearing page', I => {
  I.click(hearing.details.title);

  // What to expect at your hearing
  I.see(env.renderString(hearing.expectations.content, benefitType));

  // Hearing image caption
  I.see(env.renderString(hearing.expectations.theHearingRoom.caption[appeal.benefitType]));

  // DWP
  I.see(env.renderString(hearing.expectations.dwp.content[0], benefitType));

  // Getting a decision
  I.see(env.renderString(hearing.expectations.gettingDecision.content[1], benefitType));
});
