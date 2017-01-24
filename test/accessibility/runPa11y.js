const application = require('app');
const request = require('supertest');
const {expect} = require('test/chai-sinon');
const pa11y = require('pa11y');
const pa11yRunner = pa11y({
  ignore: [],
  hideElements: '.skiplink'
});
const accessibilityPages = [
  '/progress/md100/trackyourappeal'
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
