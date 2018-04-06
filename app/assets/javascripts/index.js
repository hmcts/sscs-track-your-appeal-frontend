const {
  getAppeal,
  changeEmailAddress,
  stopReceivingEmails
} = require('app/services/appealService');
const { validateToken } = require('app/services/tokenService');
const { matchSurnameToAppeal } = require('app/services/matchSurnameToAppeal');

module.exports = {
  getAppeal,
  changeEmailAddress,
  stopReceivingEmails,
  validateToken,
  matchSurnameToAppeal
};
