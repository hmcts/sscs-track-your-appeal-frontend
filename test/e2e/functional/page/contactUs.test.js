const { appeal } = require('test/mock/data/oral/appealReceived');
const { contactUs } = require('app/assets/locale/en');

Feature('Contact us');

Before(I => {
  I.enterSurnameAndSubmitAndSeeTYA(appeal);
});

Scenario('verify contact us page', I => {
  // Click into 'Contact us'
  I.navByClick(contactUs.title);
  I.wait('2');
  // See the title
  I.see(contactUs.title);

  // England and Wales content
  I.see(contactUs.description);
  I.see(contactUs.openingHours);
  I.see(contactUs.englandWales.heading);

  // Scotland content
  I.see(contactUs.englandWales.phoneNumber);
  I.see(contactUs.scotland.heading);
  I.see(contactUs.scotland.phoneNumber);
});
