const {getContentAsString, getContentAsArray} = require('app/core/contentLookup');
const {contentSubKeys} = require('app/config');
const {tyaNunjucks} = require('app/core/tyaNunjucks');

const applyContentToEvents = (req, res, next) => {
  apply(res.locals.appeal);
  next();
};

const apply = (appeal) => {
  setHeadingAndRenderedContentOnEvents(appeal.latestEvents);
  setHeadingAndRenderedContentOnEvents(appeal.historicalEvents);
};

const setHeadingAndRenderedContentOnEvents = (events) => {
  events.forEach(event => {
    setHeadingOnEvent(event);
    setRenderedContentOnEvent(event);
  });
};

const setHeadingOnEvent = (event) => {
  event.heading = getContentAsString(event.contentKey + contentSubKeys.HEADING);
};

const setRenderedContentOnEvent = (event) => {
  const contentArray = getContentAsArray(event.contentKey + contentSubKeys.CONTENT);
  event.renderedContent = renderArrayContent(contentArray, event.placeholder);
};

const renderArrayContent = (content, placeholder) => {
  return content.map(str => tyaNunjucks.env.renderString(str, placeholder));
};

module.exports = { applyContentToEvents };
