/* eslint-disable no-invalid-this  */
const { validateSurname } = require('app/assets/locale/en');
const paths = require('paths');

const waitTime = 10;

function enterSurnameAndSubmit(surname) {
  const I = this;
  I.waitForElement('#surname', waitTime);
  I.fillField('#surname', surname);
  I.navByClick(validateSurname.submit);
}

function enterSurnameAndSubmitAndSeeTYA(appeal) {
  const I = this;

  I.amOnLoadedPage(`${paths.tya.validateSurname}/${appeal.appealNumber}${paths.tya.trackYourAppeal}`);
  I.enterSurnameAndSubmit(appeal.surname);
  I.wait(3); // eslint-disable-line
  I.seeCurrentUrlEquals(`${paths.tya.trackYourAppeal}/${appeal.appealNumber}`);
}

module.exports = { enterSurnameAndSubmit, enterSurnameAndSubmitAndSeeTYA };
