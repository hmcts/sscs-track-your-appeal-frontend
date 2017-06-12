const serviceName = 'Track my appeal for Social Security and Child Support';
const appealsAPI  = (process.env.SSCS_API_URL || 'http://localhost:8080') + '/appeals';
const healthAPI   = (process.env.SSCS_API_URL || 'http://localhost:8080') + '/health';
const tokenAPI    = (process.env.SSCS_API_URL || 'http://localhost:8080') + '/tokens';

const contentSubKeys = {
  HEADING: '.heading',
  CONTENT: '.content',
};

module.exports = {
  serviceName: serviceName,
  appealsAPI: appealsAPI,
  healthAPI: healthAPI,
  tokenAPI: tokenAPI,
  contentSubKeys: contentSubKeys
};
