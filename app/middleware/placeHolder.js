const {events} = require('app/core/events');

const applyPlaceholders = (req, res, next) => {
  const appeal = res.locals.appeal;
  apply(appeal.latestEvents, appeal.benefitType);
  apply(appeal.historicalEvents, appeal.benefitType);
  next();
};

const apply = (events, benefitType) => {
  events.forEach(event => {
    setDateOnPlaceholder(event);
    setBenefitTypeOnPlaceholder(event, benefitType);
  });
};

const setDateOnPlaceholder = (event) => {
  if(event.type === events.EVIDENCE_RECEIVED.name ||
    event.type === events.HEARING.name ||
    event.type === events.DORMANT.name) {

    event.placeholder.date = event.date;
  }
};

const setBenefitTypeOnPlaceholder = (event, benefitType) => {
  if(!event.placeholder) {
    event.placeholder = {};
  }
  event.placeholder.benefitType = benefitType;
};

module.exports = { applyPlaceholders };
