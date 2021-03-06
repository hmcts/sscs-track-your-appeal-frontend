const { env } = require('test/e2e/helpers/nunjucksHelper');
const { applyContentToEvents } = require('app/middleware/events');
const { expect, sinon } = require('test/chai-sinon');
const { appeal } = require('test/mock/data/oral/dwpRespond');

describe('events.js', () => {
  const req = sinon.stub();
  const next = sinon.stub();
  let res = null;

  beforeEach(() => {
    res = { locals: { appeal } };
    applyContentToEvents(req, res, next);
  });

  describe('applyContentToEvents', () => {
    it('should call next', () => {
      return expect(next).to.have.been.called;
    });
  });

  describe('latestEvents', () => {
    let latestEvents = null;

    before(() => {
      latestEvents = res.locals.appeal.latestEvents[0];
    });

    it('should contain heading index', () => {
      const benefitType = 'pip';
      expect(latestEvents).to.have.any.keys('heading');
      expect(env.renderString(latestEvents.heading, { benefitType })).to.equal('DWP response');
    });

    it('should contain benefitType index', () => {
      expect(latestEvents).to.have.any.keys('benefitType');
      expect(latestEvents.benefitType).to.equal('pip');
    });

    it('should contain renderedContent index', () => {
      expect(latestEvents).to.have.any.keys('renderedContent');
      expect(latestEvents.renderedContent).to.be.an('array');
    });
  });

  describe('historicalEvents', () => {
    let historicalEvents = null;

    before(() => {
      historicalEvents = res.locals.appeal.historicalEvents[0];
    });

    it('should contain heading index', () => {
      expect(historicalEvents).to.have.any.keys('heading');
      expect(historicalEvents.heading).to.equal('Appeal received');
    });

    it('should contain benefitType index', () => {
      expect(historicalEvents).to.have.any.keys('benefitType');
      expect(historicalEvents.benefitType).to.equal('pip');
    });

    it('should contain renderedContent index', () => {
      expect(historicalEvents).to.have.any.keys('renderedContent');
      expect(historicalEvents.renderedContent).to.be.an('array');
    });
  });
});
