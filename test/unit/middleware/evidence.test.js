const { applyEvidence, evidenceReminderStatuses } = require('app/middleware/evidence');
const { expect, sinon } = require('test/chai-sinon');
const { events } = require('app/core/events');
const { without } = require('lodash');

describe('event.js', () => {
  let req = null, res = null, next = null;

  const allStatuses = Object.keys(events);
  const nonEvidenceReminderStatuses = without(allStatuses, ...evidenceReminderStatuses);

  beforeEach(() => {
    req = sinon.stub();
    res = { locals: { appeal: {} } };
    next = sinon.stub();
  });

  describe('the apply() function', () => {
    it('should set the showEvidenceReminder flag to true', () => {
      evidenceReminderStatuses.forEach(status => {
        res.locals.appeal.status = status;
        res.locals.appeal.latestEvents = [];
        res.locals.appeal.historicalEvents = [];
        applyEvidence(req, res, next);
        return expect(res.locals.appeal.showEvidenceReminder).to.be.true;
      });
    });

    it('should set the showEvidenceReminder flag to false', () => {
      nonEvidenceReminderStatuses.forEach(status => {
        res.locals.appeal.status = status;
        res.locals.appeal.latestEvents = [];
        res.locals.appeal.historicalEvents = [];
        applyEvidence(req, res, next);
        return expect(res.locals.appeal.showEvidenceReminder).to.be.false;
      });
    });
  });

  describe('the setEvidenceReceivedFlag() function', () => {
    it('should set the evidenceReceived flag to true when the latest events array contains an evidence received event', () => {
      evidenceReminderStatuses.forEach(status => {
        res.locals.appeal.status = status;
        res.locals.appeal.latestEvents = [{ type: events.EVIDENCE_RECEIVED.name }];
        res.locals.appeal.historicalEvents = [];
        applyEvidence(req, res, next);
        return expect(res.locals.appeal.evidenceReceived).to.be.true;
      });
    });

    it('should set the evidenceReceived flag to true when the historical events array contains an evidence received event', () => {
      evidenceReminderStatuses.forEach(status => {
        res.locals.appeal.status = status;
        res.locals.appeal.latestEvents = [];
        res.locals.appeal.historicalEvents = [{ type: events.EVIDENCE_RECEIVED.name }];
        applyEvidence(req, res, next);
        return expect(res.locals.appeal.evidenceReceived).to.be.true;
      });
    });

    it('should set the evidenceReceived flag to false when the latest events array does NOT contain an evidence received event', () => {
      const anyNonEvidenceReceivedEvent = { type: events.APPEAL_RECEIVED.name };
      evidenceReminderStatuses.forEach(status => {
        res.locals.appeal.status = status;
        res.locals.appeal.latestEvents = [anyNonEvidenceReceivedEvent];
        res.locals.appeal.historicalEvents = [];
        applyEvidence(req, res, next);
        return expect(res.locals.appeal.evidenceReceived).to.be.false;
      });
    });

    it('should set the evidenceReceived flag to false when the historical events array does NOT contain an evidence received event', () => {
      const anyNonEvidenceReceivedEvent = { type: events.APPEAL_RECEIVED.name };
      evidenceReminderStatuses.forEach(status => {
        res.locals.appeal.status = status;
        res.locals.appeal.latestEvents = [];
        res.locals.appeal.historicalEvents = [anyNonEvidenceReceivedEvent];
        applyEvidence(req, res, next);
        return expect(res.locals.appeal.evidenceReceived).to.be.false;
      });
    });
  });

  it('should call next()', () => {
    applyEvidence(req, res, next);
    return expect(next).to.have.been.called;
  });
});
