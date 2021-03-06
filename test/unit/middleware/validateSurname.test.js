const { validateSurname } = require('app/middleware/validateSurname');
const { expect, sinon } = require('test/chai-sinon');
const validateSurnameContent = require('app/assets/locale/en').validateSurname;

describe('validateSurname.js', () => {
  const id = 'validId';
  const originalPage = 'abouthearing';
  let req = null, res = null, next = null;

  beforeEach(() => {
    req = {
      params: {
        id,
        originalPage
      },
      body: {}
    };
    res = {
      render: sinon.stub(),
      locals: { i18n: { validateSurname: validateSurnameContent } }
    };
    next = sinon.stub();
  });

  describe('no field errors', () => {
    it('calls next when there are no field errors', () => {
      req.body.surname = 'László-Erdős 姓名';
      validateSurname(req, res, next);
      return expect(next).to.have.been.called;
    });
  });

  describe('field errors', () => {
    let fields = null;

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
      expect(res.render).to.have.been.calledWith('validate-surname', { id, fields, originalPage });
    });

    it('calls res.render when the field has less than 2 characters', () => {
      fields.surname.value = 'A';
      fields.surname.errorHeading = validateSurnameContent.surname.errors.notValidHeading;
      fields.surname.errorMessage = validateSurnameContent.surname.errors.notValidHeading;
      req.body.surname = 'A';
      validateSurname(req, res, next);
      expect(res.render).to.have.been.calledWith('validate-surname', { id, fields, originalPage });
    });
  });
});
