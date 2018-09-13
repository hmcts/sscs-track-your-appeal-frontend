const { getContentAsString, getContentAsArray } = require('app/core/contentLookup');
const { tyaNunjucks, renderContent } = require('app/core/tyaNunjucks');

const contentSubKeys = {
  HEADING: '.heading',
  CONTENT: '.content'
};

const renderArrayContent = (content, event) => {
  return content.map(str => {
    console.info('mapping ', str)
    return tyaNunjucks.env.renderString(str, event);
  });
};

const setRenderedContentOnEvent = (event, appeal) => {
  const hearingType = appeal.hearingType;
  const contentArray = getContentAsArray(`${event.contentKey}.${hearingType}${contentSubKeys.CONTENT}`);
  event.renderedContent = renderArrayContent(contentArray, event);
};

const setBenefitTypeOnEvent = (event, benefitType) => {
  event.benefitType = benefitType;
};

const setHeadingOnEvent = (event, benefitType) => {
  event.heading =
    renderContent(getContentAsString(event.contentKey + contentSubKeys.HEADING), benefitType);
};

const setHeadingAndRenderedContentOnEvents = (events, appeal) => {
  events.forEach(event => {
    setHeadingOnEvent(event, appeal);
    setBenefitTypeOnEvent(event, appeal.benefitType);
    setRenderedContentOnEvent(event, appeal);
  });
};

const apply = appeal => {
  setHeadingAndRenderedContentOnEvents(appeal.latestEvents, appeal);
  setHeadingAndRenderedContentOnEvents(appeal.historicalEvents, appeal);
};

const applyContentToEvents = (req, res, next) => {
  apply(res.locals.appeal);
  next();
};

module.exports = { applyContentToEvents };
