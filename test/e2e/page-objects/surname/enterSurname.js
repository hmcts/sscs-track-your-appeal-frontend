/* eslint-disable no-invalid-this  */
const { validateSurname } = require('app/assets/locale/en');
const paths = require('paths');

function enterSurnameAndSubmit(surname) {
  const I = this;

  I.fillField('#surname', surname);
  I.navByClick(validateSurname.submit);
}

function enterSurnameAndSubmitAndSeeTYA(appeal) {
  const I = this;

  I.amOnLoadedPage(`${paths.tya.validateSurname}/${appeal.appealNumber}`);
  I.enterSurnameAndSubmit(appeal.surname);
  I.seeCurrentUrlEquals(`${paths.tya.trackYourAppeal}/${appeal.appealNumber}`);
}

module.exports = { enterSurnameAndSubmit, enterSurnameAndSubmitAndSeeTYA };
