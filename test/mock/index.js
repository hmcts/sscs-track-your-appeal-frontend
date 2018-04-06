const {
  getAppeal,
  changeEmailAddress,
  stopReceivingEmails
} = require('test/mock/mockAppealService');
const { validateToken } = require('test/mock/mockTokenService');
const { matchSurnameToAppeal } = require('test/mock/mockMatchSurnameToAppealService');

module.exports = {
  getAppeal,
  changeEmailAddress,
  stopReceivingEmails,
  validateToken,
  matchSurnameToAppeal
};
