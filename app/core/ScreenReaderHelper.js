const content = require('app/assets/locale/en').progressBar.screenReader;
const {events} = require('app/core/events');
const { renderContent } = require('app/core/tyaNunjucks');

class ScreenReaderHelper {

  static classifiedAsAppealReceived(currentStatus) {
    return  currentStatus === events.APPEAL_RECEIVED.name ||
            currentStatus === events.DWP_RESPOND_OVERDUE.name;
  }

  static classifiedAsDWPRespond(currentStatus) {
    return  currentStatus === events.ADJOURNED.name ||
            currentStatus === events.DWP_RESPOND.name ||
            currentStatus === events.PAST_HEARING_BOOKED.name ||
            currentStatus === events.POSTPONED.name
  }

  static classifiedAsHearingBooked(currentStatus) {
    return  currentStatus === events.HEARING_BOOKED.name ||
            currentStatus === events.NEW_HEARING_BOOKED.name;
  }

  static getRawStringFor(currentStatus, progressBarTick) {
    switch(progressBarTick) {
      case events.APPEAL_RECEIVED.name:
        return content.appeal.happened;
      case events.DWP_RESPOND.name:
        return this.classifiedAsAppealReceived(currentStatus) ?
          content.dwpRespond.due :
          content.dwpRespond.happened;
      case events.HEARING_BOOKED.name:
        return (this.classifiedAsAppealReceived(currentStatus) ||
                this.classifiedAsDWPRespond(currentStatus)) ?
          content.hearingBooked.due :
          content.hearingBooked.happened;
      case events.HEARING.name:
        return (this.classifiedAsAppealReceived(currentStatus) ||
                this.classifiedAsDWPRespond(currentStatus)     ||
                this.classifiedAsHearingBooked(currentStatus)) ?
          content.hearing.due :
          content.hearing.happened;
      case events.DORMANT.name:
        return content.hearing.happened;
    }
  }

  static getScreenReaderTextFor(currentStatus, progressBarTick, data) {
    const rawString = ScreenReaderHelper.getRawStringFor(currentStatus, progressBarTick);
    return rawString.indexOf('{{') !== -1 ? renderContent(rawString, data || {}) : rawString;
  }
}

module.exports = ScreenReaderHelper;
