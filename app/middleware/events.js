const {getContentAsString, getContentAsArray} = require('app/core/contentLookup');
const {tyaNunjucks} = require('app/core/tyaNunjucks');

const contentSubKeys = {
  HEADING: '.heading',
  CONTENT: '.content'
};

const applyContentToEvents = (req, res, next) => {
  apply(res.locals.appeal);
  next();
};

const apply = (appeal) => {
  setHeadingAndRenderedContentOnEvents(appeal.latestEvents, appeal);
  setHeadingAndRenderedContentOnEvents(appeal.historicalEvents, appeal);
};

const setHeadingAndRenderedContentOnEvents = (events, appeal) => {
  events.forEach(event => {
    setHeadingOnEvent(event);
    setBenefitTypeOnEvent(event, appeal.benefitType);
    setRenderedContentOnEvent(event);
  });
};

const setHeadingOnEvent = (event) => {
  event.heading = getContentAsString(event.contentKey + contentSubKeys.HEADING);
};

const setBenefitTypeOnEvent = (event, benefitType) => {
  event.benefitType = benefitType;
};

const setRenderedContentOnEvent = (event) => {
  const contentArray = getContentAsArray(event.contentKey + contentSubKeys.CONTENT);
  event.renderedContent = renderArrayContent(contentArray, event);
};

const renderArrayContent = (content, event) => {
  return content.map(str => tyaNunjucks.env.renderString(str, event));
};

module.exports = { applyContentToEvents };
