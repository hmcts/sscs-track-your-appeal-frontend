const SERVICE_NAME = 'Track my appeal for Social Security and Child Support';
const TRACK_YOUR_APPEAL_ENDPOINT = (process.env.SSCS_API_URL || 'http://localhost:8080') + '/appeals';
const MOCK_DATA = process.env.SSCS_MOCK_DATA === 'true';

const STATUSES = {
  APPEAL_RECEIVED: 0,
  DWP_RESPOND: 1,
  HEARING_BOOKED: 2,
  HEARING: 3
};

module.exports = {
  STATUSES: STATUSES,
  SERVICE_NAME: SERVICE_NAME,
  MOCK_DATA: MOCK_DATA,
  TRACK_YOUR_APPEAL_ENDPOINT: TRACK_YOUR_APPEAL_ENDPOINT
};
