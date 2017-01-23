const appeal = require('./appealReceived.json');
const dwpRespond = require('./dwpRespond.json');
const hearingBooked = require('./hearingBooked.json');
const hearing = require('./hearing.json');

module.exports = {
  md100: appeal,
  md200: dwpRespond,
  md300: hearingBooked,
  md400: hearing
};
