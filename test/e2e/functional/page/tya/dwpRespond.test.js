// const { env } = require('test/e2e/helpers/nunjucksHelper');
// const { appeal } = require('test/mock/data/oral/dwpRespond');
// const { common, status } = require('public/locale/en');

// Feature('TYA - DWP Respond');

// Before(I => {
//   I.enterSurnameAndSubmitAndSeeTYA(appeal);
// });

// Scenario('Verify DWP respond appeal details, progress bar status, screen reader text and content', I => {
//   I.seeAppealDetails(appeal);
//   I.seeProgressBarAtDWPRespond();
//   I.seeScreenReaderTextAtDWPRespond();

//   // Content.
//   I.see(common.latestUpdate);
//   status.dwpRespond.oral.content.forEach(content => {
//     I.see(env.renderString(content, {
//       benefitType: appeal.benefitType,
//       hearingContactDate: appeal.latestEvents[0].hearingContactDate
//     }));
//   });
// });
