const {events} = require('app/core/events');
const {includes} = require('lodash');

const evidenceReminderStatuses = [
  events.ADJOURNED.name,
  events.APPEAL_RECEIVED.name,
  events.DWP_RESPOND.name,
  events.DWP_RESPOND_OVERDUE.name,
  events.HEARING_BOOKED.name,
  events.NEW_HEARING_BOOKED.name,
  events.PAST_HEARING_BOOKED.name,
  events.POSTPONED.name
];

const applyEvidence = (req, res, next) => {
  apply(res.locals.appeal);
  next();
};

const apply = (appeal) => {
  appeal.showEvidenceReminder = showEvidenceReminderStatuses(appeal);
  if(appeal.showEvidenceReminder) {
    setEvidenceReceivedFlag(appeal);
  }
};

const showEvidenceReminderStatuses = (appeal) => {
  return includes(evidenceReminderStatuses, appeal.status);
};

const setEvidenceReceivedFlag = (appeal) => {
  const evidenceRecievedInLatestEvents = getFirstEventWithMatchingType(
    appeal.latestEvents, events.EVIDENCE_RECEIVED.name);
  const evidenceRecievedInHistoricalEvents = getFirstEventWithMatchingType(
    appeal.historicalEvents, events.EVIDENCE_RECEIVED.name);

  appeal.evidenceReceived = !!(evidenceRecievedInLatestEvents || evidenceRecievedInHistoricalEvents);
};

const getFirstEventWithMatchingType = (events, type) =>
  events.filter(event => event.type === type)[0];

module.exports = { applyEvidence, evidenceReminderStatuses };
