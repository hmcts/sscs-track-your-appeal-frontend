const { env } = require('test/e2e/helpers/nunjucksHelper');
const { appeal } = require('test/mock/data/appealReceived');
const { evidence } = require('app/assets/locale/en');

const benefitType = { benefitType: appeal.benefitType };

Feature('Evidence');

Before(I => {
  I.enterSurnameAndSubmitAndSeeTYA(appeal);
});

Scenario('Verify the dynamic content of the /evidence page', I => {
  I.wait('2');
  I.navByClick(evidence.provide.title);


  I.wait('2');
  I.see(env.renderString(evidence.provide.content[0], benefitType));
  I.see(env.renderString(evidence.provide.medicalEvidence.content[0], benefitType));
  I.see(env.renderString(evidence.provide.statement.content[0], benefitType));
  I.see(env.renderString(evidence.provide.photoEvidence.content[0], benefitType));
  I.see(env.renderString(evidence.provide.oralEvidence.content[0], benefitType));
});
