'use strict';

const { applyContentToEvents } = require('app/middleware/events');
const { expect, sinon } = require('test/chai-sinon');
const { appeal } = require('test/mock/data/dwpRespond');

describe('events.js', () => {

  const req = sinon.stub();
  const next = sinon.stub();
  let res;

  beforeEach(() => {

    res = {
      locals: {
        appeal
      }
    };

    applyContentToEvents(req, res, next);

  });

  describe('applyContentToEvents', () => {

    it('should call next', () => {
      expect(next).to.have.been.called;
    });

  });

  describe('latestEvents', () => {

    let latestEvents;

    before(() => {
      latestEvents = res.locals.appeal.historicalEvents[0];
    });

    it('should contain heading index', () => {
      expect(latestEvents).to.have.any.keys('heading');
      expect(latestEvents.heading).to.equal('Evidence received');
    });

    it('should contain benefitType index', () => {
      expect(latestEvents).to.have.any.keys('benefitType');
      expect(latestEvents.benefitType).to.equal('esa');
    });

    it('should contain renderedContent index', () => {
      expect(latestEvents).to.have.any.keys('renderedContent');
      expect(latestEvents.renderedContent).to.be.an('array');
    });

  });

  describe('historicalEvents', () => {

    let historicalEvents;

    before(() => {
      historicalEvents = res.locals.appeal.historicalEvents[1];
    });

    it('should contain heading index', () => {
      expect(historicalEvents).to.have.any.keys('heading');
      expect(historicalEvents.heading).to.equal('Appeal received');
    });

    it('should contain benefitType index', () => {
      expect(historicalEvents).to.have.any.keys('benefitType');
      expect(historicalEvents.benefitType).to.equal('esa');
    });

    it('should contain renderedContent index', () => {
      expect(historicalEvents).to.have.any.keys('renderedContent');
      expect(historicalEvents.renderedContent).to.be.an('array');
    });

  });

});
