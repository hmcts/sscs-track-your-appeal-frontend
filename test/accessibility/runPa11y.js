const { expect } = require('test/chai-sinon');
const supertest = require('supertest');
const app = require('app');

const agent = supertest.agent(app);
const pa11y = require('pa11y');

const space = 2;

const pa11yTest = pa11y({
  ignore: [
    'WCAG2AA.Principle1.Guideline1_3.1_3_1.H49.I',
    'WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.BgImage',
    'WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Abs',
    'WCAG2AA.Principle1.Guideline1_4.1_4_3.G145.Abs',
    'WCAG2AA.Principle1.Guideline1_3.1_3_1_A.G141'
  ],
  hideElements: '.skiplink .govuk-box-highlight, #logo, #footer, link[rel=mask-icon], ' +
  '.skipAccessTest'
});

const manageEmailNotifications = '/manage-email-notifications/NnwxNDg3MDY1ODI4fDExN3BsSDdrVDc=';

const accessibilityPages = [
  '/validate-surname/OEk16aq6uk',
  '/contactus/OEk16aq6uk',
  '/abouthearing/OEk16aq6uk',
  '/trackyourappeal/OEk16aq6uk',
  '/trackyourappeal/md005',
  '/trackyourappeal/md008',
  '/trackyourappeal/md007',
  // hearing booked
  '/hearingdetails/md008',
  // hearing
  '/hearingdetails/md007/1',
  '/expenses/md007',
  '/evidence/md007',
  manageEmailNotifications,
  `${manageEmailNotifications}/change`,
  `${manageEmailNotifications}/stop`,
  `${manageEmailNotifications}/stopconfirm`
];

accessibilityPages.forEach(page => {
  describe(`Running Accessibility tests for: ${page}`, () => {
    let pageResults = null;

    before(done => {
      pa11yTest.run(agent.get(page).url, (error, results) => {
        if (error) {
          throw new Error(`Pa11y error whilst testing page: ${page}`);
        }
        pageResults = results;
        done();
      });
    });

    it('should pass without errors or warnings', () => {
      const errors = pageResults.filter(result => {
        return result.type === 'error' || result.type === 'warning';
      });
      expect(errors.length).to.equal(0, JSON.stringify(errors, null, space));
    });
  });
});
