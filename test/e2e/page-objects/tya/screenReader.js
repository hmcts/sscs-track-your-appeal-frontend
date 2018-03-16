const screenReader = require('public/locale/en').progressBar.screenReader;

const screenReaderText = (I, dwpRespond=false, hearingBooked=false, hearing=false) => {

  const appealReceivedTxt = screenReader.appeal.happened;
  const dwpRespondTxt = dwpRespond ? screenReader.dwpRespond.happened : screenReader.dwpRespond.due;
  const hearingBookedTxt = hearingBooked ? screenReader.hearingBooked.happened : screenReader.hearingBooked.due;
  const hearingTxt = hearing ? screenReader.hearing.happened : screenReader.hearing.due;

  I.see(appealReceivedTxt);
  I.see(dwpRespondTxt);
  I.see(hearingBookedTxt);
  I.see(hearingTxt);

};

function seeScreenReaderTextAtAppealReceived() {
  screenReaderText(this);
}

function seeScreenReaderTextAtDWPRespond() {
  screenReaderText(this, true);
}

function seeScreenReaderTextAtHearingBooked() {
  screenReaderText(this, true, true);
}

function seeScreenReaderTextAtHearing() {
  screenReaderText(this, true, true, true);
}


module.exports = {
  seeScreenReaderTextAtAppealReceived,
  seeScreenReaderTextAtDWPRespond,
  seeScreenReaderTextAtHearingBooked,
  seeScreenReaderTextAtHearing
};
