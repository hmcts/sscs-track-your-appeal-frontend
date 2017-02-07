const application = require('app');
const request = require('supertest');
const {expect} = require('test/chai-sinon');
const pa11y = require('pa11y');
const pa11yRunner = pa11y({
  ignore: ['WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail'],
  hideElements: '.skiplink'
});
const accessibilityPages = [
  '/progress/md100/abouthearing',
  '/progress/md100/trackyourappeal',
  '/progress/md200/trackyourappeal',
  '/progress/md300/trackyourappeal',
  '/progress/md400/trackyourappeal',
  //'/progress/md400/hearingdetails',
  '/progress/md400/expenses',
  '/progress/md400/evidence'
];

accessibilityPages.forEach((page) => {

  describe('Running Accessibility tests for: ' + page, () => {

    let pageResults, app;

    beforeEach((done) => {
      app = application();
      pa11yRunner.run(request(app.exp).get(page).url, (error, results) => {
        if (error) {
          throw new Error('Pa11y errored whilst testing page:' + page);
        }
        pageResults = results;
        done();
      });
    });

    afterEach(() => {
      app.srv.close();
    });

    it('should pass without errors', () => {
      let errors = pageResults.filter((result) => {
        return result.type === 'error';
      });
      expect(errors.length).to.equal(0, JSON.stringify(errors, null, 2));
    });

  });
});
