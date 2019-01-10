const { env } = require('test/e2e/helpers/nunjucksHelper');
const { appeal } = require('test/mock/data/oral/appealReceived');
const { common, status } = require('public/locale/en');

Feature('TYA - Appeal Received');

Before(I => {
  I.enterSurnameAndSubmitAndSeeTYA(appeal);
});

Scenario('Verify appeal received details, progress bar status, screen reader text and content @appealReceived', I => {
  I.seeAppealDetails(appeal);
  I.seeProgressBarAtAppealReceived();
  I.seeScreenReaderTextAtAppealReceived();

  // Content.
  I.see(common.latestUpdate);

  // below commented out because it requires a new appeal being pushed everytime so after three months this step will fail for known appeal.
  const renderString = env.renderString(status.appealReceived.oral.content[0],
    { benefitType: appeal.benefitType, dwpResponseDate: appeal.latestEvents[0].dwpResponseDate });

  I.see(renderString);
});
