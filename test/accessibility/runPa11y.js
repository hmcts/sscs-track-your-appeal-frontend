const app = require('app');
const request = require('supertest');
const {expect} = require('test/chai-sinon');
const pa11y = require('pa11y');
const pa11yRunner = pa11y({
  ignore: [
    'WCAG2AA.Principle1.Guideline1_3.1_3_1.H49.I',
    'WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.BgImage',
    'WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Abs',
    'WCAG2AA.Principle1.Guideline1_4.1_4_3.G145.Abs',
    'WCAG2AA.Principle1.Guideline1_3.1_3_1_A.G141'
  ],

  hideElements: '.skiplink .govuk-box-highlight, #logo, #footer, link[rel=mask-icon], .skipAccessTest'
});

const manageEmailNotifications = '/manage-email-notifications/NnwxNDg3MDY1ODI4fDExN3BsSDdrVDc=';

const accessibilityPages = [
  '/progress/md002/contactus',
  '/progress/md002/abouthearing',
  '/trackyourappeal/md002',
  '/trackyourappeal/md005',
  '/trackyourappeal/md008',
  '/trackyourappeal/md007',
  '/progress/md008/hearingdetails',    // hearing booked
  '/progress/md007/hearingdetails/1',  // hearing
  '/progress/md007/expenses',
  '/progress/md007/evidence',
  manageEmailNotifications,
  `${manageEmailNotifications}/change`,
  `${manageEmailNotifications}/stop`,
  `${manageEmailNotifications}/stopconfirm`,
];

accessibilityPages.forEach((page) => {

  describe('Running Accessibility tests for: ' + page, () => {

    let pageResults;

    before((done) => {
        pa11yRunner.run(request(app).get(page).url, (error, results) => {
          if (error) {
            throw new Error('Pa11y errored whilst testing page:' + page);
          }
          pageResults = results;
          done();
        });
    });

    it('should pass without errors or warnings', () => {
      let errors = pageResults.filter((result) => {
        return result.type === 'error' || result.type === 'warning'
      });
      expect(errors.length).to.equal(0, JSON.stringify(errors, null, 2));
    });

  });
});
