const adjourned = require('./adjourned.json');
const appealReceived = require('./appealReceived.json');
const closed = require('./closed.json');
const dormant = require('./dormant.json');
const dwpRespond = require('./dwpRespond.json');
const dwpRespondOverdue = require('./dwpRespondOverdue.json');
const hearing = require('./hearing.json');
const hearingBooked = require('./hearingBooked.json');
const lapsedRevised = require('./lapsedRevised.json');
const newHearingBooked = require('./newHearingBooked.json');
const pastHearingBooked = require('./pastHearingBooked.json');
const postponed = require('./postponed.json');
const withdrawn = require('./withdrawn.json');

module.exports = {
  md001: adjourned,
  md002: appealReceived,
  md003: closed,
  md004: dormant,
  md005: dwpRespond,
  md006: dwpRespondOverdue,
  md007: hearing,
  md008: hearingBooked,
  md009: lapsedRevised,
  md010: newHearingBooked,
  md011: pastHearingBooked,
  md012: postponed,
  md013: withdrawn
};
