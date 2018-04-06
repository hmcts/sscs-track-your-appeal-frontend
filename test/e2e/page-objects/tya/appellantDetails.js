/* eslint-disable no-invalid-this  */

function seeAppealDetails(appeal) {
  const I = this;

  I.see(`Your ${appeal.benefitType.toUpperCase()} benefit appeal`);
  I.see(appeal.name);
  I.see(`Appeal reference number: ${appeal.caseReference}`);
}

module.exports = { seeAppealDetails };
