const { validateSurname } = require('app/middleware/validateSurname');
const { expect, sinon } = require('test/chai-sinon');
const validateSurnameContent = require('app/assets/locale/en').validateSurname;

describe('validateSurname.js', () => {

  const mactoken = 'validToken';
  let req, res, next;

  beforeEach(() => {
    req = {
      params: {
        mactoken
      },
      body: {}
    };
    res = {
      render: sinon.stub(),
      locals: {
        i18n: {
          validateSurname: validateSurnameContent
        }
      }
    };
    next = sinon.stub();
  });

  describe('no field errors', ()=> {

    it('calls next when there are no field errors', () => {
      req.body.surname = 'validSurname';
      validateSurname(req, res, next);
      expect(next).to.have.been.called;
    });

  });

  describe('field errors', ()=> {

    let fields;

    beforeEach(() => {
      fields = {
        error: true,
        surname: {
          value: '',
          error: true,
          errorMessage: '',
          errorHeading: ''
        }
      };
    });

    it('calls res.render when the field is empty', () => {
      fields.surname.value = '';
      fields.surname.errorHeading = validateSurnameContent.surname.errors.emptyStringHeading;
      fields.surname.errorMessage = validateSurnameContent.surname.errors.emptyStringHeading;
      req.body.surname = '';
      validateSurname(req, res, next);
      expect(res.render).to.have.been.calledWith('validate-surname', { mactoken, fields });
    });

    it('calls res.render when the field is invalid', () => {
      fields.surname.value = '12345';
      fields.surname.errorHeading = validateSurnameContent.surname.errors.notValidHeading;
      fields.surname.errorMessage = validateSurnameContent.surname.errors.notValidHeading;
      req.body.surname = '12345';
      validateSurname(req, res, next);
      expect(res.render).to.have.been.calledWith('validate-surname', { mactoken, fields });
    });

  });

});
