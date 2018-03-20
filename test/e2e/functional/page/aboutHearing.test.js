const { environment } = require('test/e2e/helpers/nunjucksHelper');
const { hearing } = require('app/assets/locale/en');
const appealReceived = require('test/mock/data/appealReceived').appeal;
const dwpRespond = require('test/mock/data/dwpRespond').appeal;
const assert = require('assert');

const benefitType = { benefitType: appealReceived.benefitType };
const env = environment();

Feature('About hearing');

Scenario('Verify the dynamic content of the /abouthearing page', (I) => {

  I.enterSurnameAndSubmitAndSeeTYA(appealReceived);
  I.click(hearing.details.title);

  I.see(env.renderString(hearing.expectations.content, benefitType));
  I.see(env.renderString(hearing.expectations.dwp.content[0], benefitType));
  I.see(env.renderString(hearing.expectations.gettingDecision.content[1], benefitType));

});

Scenario('When I have a PIP appeal, I see the PIP image and caption', function*(I) {

  I.enterSurnameAndSubmitAndSeeTYA(appealReceived);
  I.click(hearing.details.title);

  let imageAlt = yield I.grabAttributeFrom('#hearing-room-image', 'alt');
  assert.equal(imageAlt, hearing.expectations.theHearingRoom.imageAlt.pip);
  I.see(hearing.expectations.theHearingRoom.caption.pip);

});

Scenario('When I have an ESA appeal, I see the ESA image and caption', function*(I) {

  I.enterSurnameAndSubmitAndSeeTYA(dwpRespond);
  I.click(hearing.details.title);

  let imageAlt = yield I.grabAttributeFrom('#hearing-room-image', 'alt');
  assert.equal(imageAlt, hearing.expectations.theHearingRoom.imageAlt.esa);
  I.see(hearing.expectations.theHearingRoom.caption.esa);

});
