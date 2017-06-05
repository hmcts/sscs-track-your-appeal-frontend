const testServer = require('test/testServer');
const request = require('supertest');
const {expect} = require('test/chai-sinon');
const pa11y = require('pa11y');
const pa11yRunner = pa11y({
  ignore: [
    'WCAG2AA.Principle1.Guideline1_3.1_3_1.H49.I',
    'WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.BgImage',
    'WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Abs',
    'WCAG2AA.Principle1.Guideline1_3.1_3_1_A.G141'
  ],

  hideElements: '.skiplink .govuk-box-highlight, #logo, #footer, link[rel=mask-icon], .skipAccessTest'
});
const accessibilityPages = [
  '/progress/md100/contactus',
  '/progress/md100/abouthearing',
  '/progress/md100/trackyourappeal',
  '/progress/md200/trackyourappeal',
  '/progress/md300/trackyourappeal',
  '/progress/md400/trackyourappeal',
  '/progress/md400/hearingdetails',
  '/progress/md400/expenses',
  '/progress/md400/evidence',
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
