const progressBar = {
  NONE: -1,
  APPEAL_RECEIVED: 0,
  DWP_RESPOND: 1,
  HEARING_BOOKED: 2,
  HEARING: 3
};

const events = {
  ADJOURNED: {
    name: 'ADJOURNED',
    index: progressBar.DWP_RESPOND,
    contentKey: 'status.adjourned'
  },
  APPEAL_RECEIVED: {
    name: 'APPEAL_RECEIVED',
    index: progressBar.APPEAL_RECEIVED,
    contentKey: 'status.appealReceived'
  },
  CLOSED: {
    name: 'CLOSED',
    index: progressBar.NONE,
    contentKey: 'status.closed'
  },
  DORMANT: {
    name: 'DORMANT',
    index: progressBar.HEARING,
    contentKey: 'status.dormant'
  },
  DWP_RESPOND: {
    name: 'DWP_RESPOND',
    index: progressBar.DWP_RESPOND,
    contentKey: 'status.dwpRespond'
  },
  DWP_RESPOND_OVERDUE: {
    name: 'DWP_RESPOND_OVERDUE',
    index: progressBar.APPEAL_RECEIVED,
    contentKey: 'status.dwpRespondOverdue'
  },
  EVIDENCE_RECEIVED: {
    name: 'EVIDENCE_RECEIVED',
    index: progressBar.NONE,
    contentKey: 'status.evidenceReceived'
  },
  HEARING: {
    name: 'HEARING',
    index: progressBar.HEARING,
    contentKey: 'status.hearing'
  },
  HEARING_BOOKED: {
    name: 'HEARING_BOOKED',
    index: progressBar.HEARING_BOOKED,
    contentKey: 'status.hearingBooked'
  },
  LAPSED_REVISED: {
    name: 'LAPSED_REVISED',
    index: progressBar.NONE,
    contentKey: 'status.lapsedRevised'
  },
  NEW_HEARING_BOOKED: {
    name: 'NEW_HEARING_BOOKED',
    index: progressBar.HEARING_BOOKED,
    contentKey: 'status.newHearingBooked'
  },
  PAST_HEARING_BOOKED: {
    name: 'PAST_HEARING_BOOKED',
    index: progressBar.DWP_RESPOND,
    contentKey: 'status.pastHearingBooked'
  },
  POSTPONED: {
    name: 'POSTPONED',
    index: progressBar.DWP_RESPOND,
    contentKey: 'status.postponed'
  },
  WITHDRAWN: {
    name: 'WITHDRAWN',
    index: progressBar.NONE,
    contentKey: 'status.withdrawn'
  }
};

module.exports = { events, progressBar };
