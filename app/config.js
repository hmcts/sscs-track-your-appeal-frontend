const serviceName = 'Track my appeal for Social Security and Child Support';
const appealsAPI  = (process.env.SSCS_API_URL  || 'http://localhost:8080') + '/appeals';
const healthAPI   = (process.env.SSCS_API_URL  || 'http://localhost:8080') + '/health';
const tokenAPI    = (process.env.SSCS_API_URL  || 'http://localhost:8080') + '/tokens';
const cookieSecret = process.env.COOKIE_SECRET || 'cookie-secret';

const dateFormat = {
  utc: 'YYYY-MM-DDTHH:mm:ssZ',
  date: 'DD MMMM YYYY',
  time: 'HH:mm'
};

const timeZone = 'Europe/London';

const contentSubKeys = {
  HEADING: '.heading',
  CONTENT: '.content',
};

module.exports = {
  serviceName,
  appealsAPI,
  healthAPI,
  tokenAPI,
  contentSubKeys,
  dateFormat,
  timeZone,
  cookieSecret
};
