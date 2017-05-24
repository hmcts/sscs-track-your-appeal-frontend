const SERVICE_NAME = 'Track my appeal for Social Security and Child Support';
const APPEALS_ENDPOINT = (process.env.SSCS_API_URL || 'http://localhost:8080') + '/appeals';
const HEALTH_ENDPOINT = (process.env.SSCS_API_URL || 'http://localhost:8080') + '/health';
const TOKEN_ENDPOINT = (process.env.SSCS_API_URL || 'http://localhost:8080') + '/tokens';

const PROGRESS_BAR = {
  NONE: -1,
  APPEAL_RECEIVED: 0,
  DWP_RESPOND: 1,
  HEARING_BOOKED: 2,
  HEARING: 3
};

const EVENTS = {
  APPEAL_RECEIVED: {
    name: "APPEAL_RECEIVED",
    index: PROGRESS_BAR.APPEAL_RECEIVED,
    contentKey: 'status.appealReceived'
  },
  DWP_RESPOND: {
    name: "DWP_RESPOND",
    index: PROGRESS_BAR.DWP_RESPOND,
    contentKey: 'status.dwpRespond'
  },
  HEARING_BOOKED: {
    name: "HEARING_BOOKED",
    index: PROGRESS_BAR.HEARING_BOOKED,
    contentKey: 'status.hearingBooked'
  },
  HEARING: {
    name: "HEARING",
    index: PROGRESS_BAR.HEARING,
    contentKey: 'status.hearing'
  },
  POSTPONED: {
    name: "POSTPONED",
    index: PROGRESS_BAR.DWP_RESPOND,
    contentKey: 'status.postponed'
  },
  PAST_HEARING_BOOKED: {
    name: "PAST_HEARING_BOOKED",
    index: PROGRESS_BAR.DWP_RESPOND,
    contentKey: 'status.pastHearingBooked'
  },
  ADJOURNED: {
    name: "ADJOURNED",
    index: PROGRESS_BAR.DWP_RESPOND,
    contentKey: 'status.adjourned'
  },
  NEW_HEARING_BOOKED: {
    name: "NEW_HEARING_BOOKED",
    index: PROGRESS_BAR.HEARING_BOOKED,
    contentKey: 'status.newHearingBooked'
  },
  EVIDENCE_RECEIVED: {
    contentKey: 'status.evidenceReceived',
  },
  WITHDRAWN: {
    name: "WITHDRAWN",
    index: PROGRESS_BAR.NONE,
    contentKey: 'status.withdrawn',
  },
  DORMANT: {
    name: "DORMANT",
    index: PROGRESS_BAR.NONE,
    contentKey: 'status.dormant',
  },
  LAPSED_REVISED: {
    name: "LAPSED_REVISED",
    index: PROGRESS_BAR.NONE,
    contentKey: 'status.lapsedRevised'
  }
};

const CONTENT_SUBKEYS = {
  HEADING: '.heading',
  CONTENT: '.content',
};

module.exports = {
  EVENTS: Object.freeze(EVENTS),
  PROGRESS_BAR: Object.freeze(PROGRESS_BAR),
  CONTENT_SUBKEYS: Object.freeze(CONTENT_SUBKEYS),
  SERVICE_NAME: Object.freeze(SERVICE_NAME),
  HEALTH_ENDPOINT: Object.freeze(HEALTH_ENDPOINT),
  APPEALS_ENDPOINT: Object.freeze(APPEALS_ENDPOINT),
  TOKEN_ENDPOINT: Object.freeze(TOKEN_ENDPOINT)
};
