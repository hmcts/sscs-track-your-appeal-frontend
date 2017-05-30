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
  ADJOURNED: {
    name: "ADJOURNED",
    index: PROGRESS_BAR.DWP_RESPOND,
    contentKey: 'status.adjourned'
  },
  APPEAL_RECEIVED: {
    name: "APPEAL_RECEIVED",
    index: PROGRESS_BAR.APPEAL_RECEIVED,
    contentKey: 'status.appealReceived'
  },
  CLOSED: {
    name: "CLOSED",
    index: PROGRESS_BAR.NONE,
    contentKey: 'status.closed',
  },
  DORMANT: {
    name: "DORMANT",
    index: PROGRESS_BAR.HEARING,
    contentKey: 'status.dormant',
  },
  DWP_RESPOND: {
    name: "DWP_RESPOND",
    index: PROGRESS_BAR.DWP_RESPOND,
    contentKey: 'status.dwpRespond'
  },
  DWP_RESPOND_OVERDUE: {
    name: "DWP_RESPOND_OVERDUE",
    index: PROGRESS_BAR.APPEAL_RECEIVED,
    contentKey: 'status.dwpRespondOverdue'
  },
  EVIDENCE_RECEIVED: {
    contentKey: 'status.evidenceReceived',
  },
  HEARING: {
    name: "HEARING",
    index: PROGRESS_BAR.HEARING,
    contentKey: 'status.hearing'
  },
  HEARING_BOOKED: {
    name: "HEARING_BOOKED",
    index: PROGRESS_BAR.HEARING_BOOKED,
    contentKey: 'status.hearingBooked'
  },
  LAPSED_REVISED: {
    name: "LAPSED_REVISED",
    index: PROGRESS_BAR.NONE,
    contentKey: 'status.lapsedRevised'
  },
  NEW_HEARING_BOOKED: {
    name: "NEW_HEARING_BOOKED",
    index: PROGRESS_BAR.HEARING_BOOKED,
    contentKey: 'status.newHearingBooked'
  },
  PAST_HEARING_BOOKED: {
    name: "PAST_HEARING_BOOKED",
    index: PROGRESS_BAR.DWP_RESPOND,
    contentKey: 'status.pastHearingBooked'
  },
  POSTPONED: {
    name: "POSTPONED",
    index: PROGRESS_BAR.DWP_RESPOND,
    contentKey: 'status.postponed'
  },
  WITHDRAWN: {
    name: "WITHDRAWN",
    index: PROGRESS_BAR.NONE,
    contentKey: 'status.withdrawn',
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
