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
  I.see(contactUs.description);

  // England and Wales content
  I.see(contactUs.englandWales.heading);
  I.see(contactUs.englandWales.phoneNumber);
  I.see(contactUs.englandWales.openingHours);
  I.see(contactUs.englandWales.email);

  // Scotland content
  I.see(contactUs.scotland.heading);
  I.see(contactUs.scotland.phoneNumber);
  I.see(contactUs.scotland.openingHours);
  I.see(contactUs.scotland.email);
});
