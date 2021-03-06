
const seeProgressBar = (I,
                        appealReceivedActive='',
                        dwpRespondActive='',
                        hearingBookedActive='',
                        hearingActive='') => {

  I.seeInSource(`<div class="appeal-received ${appealReceivedActive} oral">`);
  I.seeInSource(`<div class="dwp-respond ${dwpRespondActive} oral">`);
  I.seeInSource(`<div class="hearing-booked ${hearingBookedActive} oral">`);
  I.seeInSource(`<div class="hearing ${hearingActive} oral">`);

};

const ACTIVE = 'active';

function seeProgressBarAtAppealReceived() {
  seeProgressBar(this, ACTIVE);
}

function seeProgressBarAtDWPRespond() {
  seeProgressBar(this, ACTIVE, ACTIVE);
}

function seeProgressBarAtHearingBooked() {
  seeProgressBar(this, ACTIVE, ACTIVE, ACTIVE);
}

function seeProgressBarAtHearing() {
  seeProgressBar(this, ACTIVE, ACTIVE, ACTIVE, ACTIVE);
}

function dontSeeAProgressBar() {

  const I = this;

  I.dontSeeInSource('<section class="progress-bar">');
}

module.exports = {
  dontSeeAProgressBar,
  seeProgressBarAtAppealReceived,
  seeProgressBarAtDWPRespond,
  seeProgressBarAtHearingBooked,
  seeProgressBarAtHearing
};
