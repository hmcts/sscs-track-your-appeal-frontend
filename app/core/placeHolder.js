const {events} = require('app/core/events');

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

module.exports = { setDateOnPlaceholder, setBenefitTypeOnPlaceholder};
