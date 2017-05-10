const SERVICE_NAME = 'Track my appeal for Social Security and Child Support';
const APPEALS_ENDPOINT = (process.env.SSCS_API_URL || 'http://localhost:8080') + '/appeals';
const HEALTH_ENDPOINT = (process.env.SSCS_API_URL || 'http://localhost:8080') + '/health';
const TOKEN_ENDPOINT = (process.env.SSCS_API_URL || 'http://localhost:8080') + '/tokens';

const STATUSES = {
  APPEAL_RECEIVED: {
    name: "APPEAL_RECEIVED",
    value: 0
  },
  DWP_RESPOND: {
    name: "DWP_RESPOND",
    value: 1
  },
  HEARING_BOOKED: {
    name: "HEARING_BOOKED",
    value: 2
  },
  HEARING: {
    name: "HEARING",
    value: 3
  }
};

const CONTENT_KEYS = {
  APPEAL_RECEIVED: 'status.appealReceived',
  DWP_RESPOND: 'status.dwpRespond',
  HEARING_BOOKED: 'status.hearingBooked',
  HEARING: 'status.hearing',
  EVIDENCE_RECEIVED: 'status.evidenceReceived'
};

const CONTENT_SUBKEYS = {
  HEADING: '.heading',
  CONTENT: '.content',
};

module.exports = {
  STATUSES: Object.freeze(STATUSES),
  CONTENT_KEYS: Object.freeze(CONTENT_KEYS),
  CONTENT_SUBKEYS: Object.freeze(CONTENT_SUBKEYS),
  SERVICE_NAME: Object.freeze(SERVICE_NAME),
  HEALTH_ENDPOINT: Object.freeze(HEALTH_ENDPOINT),
  APPEALS_ENDPOINT: Object.freeze(APPEALS_ENDPOINT),
  TOKEN_ENDPOINT: Object.freeze(TOKEN_ENDPOINT)
};
