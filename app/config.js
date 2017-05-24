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
  POSTPONED: {
    name: "POSTPONED",
    value: 1
  },
  PAST_HEARING_BOOKED: {
    name: "PAST_HEARING_BOOKED",
    value: 1
  },
  ADJOURNED: {
    name: "ADJOURNED",
    value: 1
  },
  HEARING_BOOKED: {
    name: "HEARING_BOOKED",
    value: 2
  },
  NEW_HEARING_BOOKED: {
    name: "NEW_HEARING_BOOKED",
    value: 2
  },
  HEARING: {
    name: "HEARING",
    value: 3
  },
  WITHDRAWN: {
    name: "WITHDRAWN",
    showProgressBar: false
  },
  DORMANT: {
    name: "DORMANT",
    showProgressBar: false
  },
  LAPSED_REVISED: {
    name: "LAPSED_REVISED",
    showProgressBar: false
  }
};

const CONTENT_KEYS = {
  APPEAL_RECEIVED: 'status.appealReceived',
  DWP_RESPOND: 'status.dwpRespond',
  HEARING_BOOKED: 'status.hearingBooked',
  NEW_HEARING_BOOKED: 'status.newHearingBooked',
  HEARING: 'status.hearing',
  EVIDENCE_RECEIVED: 'status.evidenceReceived',
  PAST_HEARING_BOOKED: "status.pastHearingBooked",
  ADJOURNED: "status.adjourned",
  DORMANT: "status.dormant",
  POSTPONED: "status.postponed",
  WITHDRAWN: "status.withdrawn",
  LAPSED_REVISED: "status.lapsedRevised"
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
