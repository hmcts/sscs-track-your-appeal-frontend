const { getAppeal, changeEmailAddress, stopReceivingEmails } = require('test/mock/mockAppealService');
const { validateToken } = require('test/mock/mockTokenService');

module.exports = { getAppeal, changeEmailAddress, stopReceivingEmails, validateToken };
