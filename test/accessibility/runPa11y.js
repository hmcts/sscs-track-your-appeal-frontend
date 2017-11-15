const testServer = require('test/testServer');
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
  '/progress/md002/trackyourappeal',
  '/progress/md005/trackyourappeal',
  '/progress/md008/trackyourappeal',
  '/progress/md007/trackyourappeal',
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

    let pageResults, httpServer;

    before((done) => {
      testServer.connect().then((server) => {
        httpServer = server;
        pa11yRunner.run(request(httpServer).get(page).url, (error, results) => {
          if (error) {
            throw new Error('Pa11y errored whilst testing page:' + page);
          }
          pageResults = results;
          done();
        });
      })
    });

    after(() => {
      httpServer.close();
    });

    it('should pass without errors or warnings', () => {
      let errors = pageResults.filter((result) => {
        return result.type === 'error' || result.type === 'warning'
      });
      expect(errors.length).to.equal(0, JSON.stringify(errors, null, 2));
    });

  });
});
