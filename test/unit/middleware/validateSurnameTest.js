const { validateSurname } = require('app/middleware/validateSurname');
const { sinon } = require('test/chai-sinon');
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
      next.should.have.been.called;
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
      fields.surname.errorHeading = validateSurnameContent.surname.errors.emptyField;
      fields.surname.errorMessage = validateSurnameContent.surname.errors.emptyField;
      req.body.surname = '';
      validateSurname(req, res, next);
      res.render.should.have.been.calledWith('validate-surname', { mactoken, fields });
    });

    it('calls res.render when the field is invalid', () => {
      fields.surname.value = '12345';
      fields.surname.errorHeading = validateSurnameContent.surname.errors.invalid;
      fields.surname.errorMessage = validateSurnameContent.surname.errors.invalid;
      req.body.surname = '12345';
      validateSurname(req, res, next);
      res.render.should.have.been.calledWith('validate-surname', { mactoken, fields });
    });

  });

});
