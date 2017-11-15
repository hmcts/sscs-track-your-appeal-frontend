const logger = require('nodejs-logging').getLogger('contentLookup.js');
const {get} = require('lodash');
const locale = require('app/assets/locale/en');

const getContentFromFile = (key) => {
  const content = get(locale, key);
  if (!content) {
    throw new ReferenceError(`Unknown key: ${key}`);
  }
  return content;
};

const getContentAsString = (key) => {
  let content;
  try{
    content = getContentFromFile(key)
  } catch(ReferenceError) {
    logger.error(ReferenceError);
  }

  return content;
};

const getContentAsArray = (key) => {
  let content = getContentAsString(key);

  if (typeof content === 'string') {
    content = [content];
  }

  return content;
};

module.exports = { getContentFromFile, getContentAsString, getContentAsArray };
