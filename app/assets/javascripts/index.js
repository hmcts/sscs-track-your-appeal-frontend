const { getAppeal, changeEmailAddress, stopReceivingEmails } = require('app/services/appealService');
const { validateToken } = require('app/services/tokenService');

module.exports = { getAppeal, changeEmailAddress, stopReceivingEmails, validateToken };
