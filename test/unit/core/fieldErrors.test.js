const { expect } = require('test/chai-sinon');
const { setErrorFields } = require('app/core/fieldErrors');

describe('setErrorFields', () => {
  const fieldName = 'fieldName';
  const errorContent = {
    emptyStringHeading: 'This field is empty',
    notValidHeading: 'This field is invalid'
  };
  const fieldsObj = {};
  let fields = null, joiResult = null, expectedResult = null;

  beforeEach(() => {
    fields = {};
    fieldsObj.fieldName = {};
    joiResult = { error: { details: [{}] } };
    expectedResult = {
      error: true,
      fieldName: { error: true }
    };
  });

  it('returns fields with empty field error message', () => {
    joiResult.error.message = errorContent.emptyStringHeading;
    joiResult.error.details[0].type = 'any.empty';
    expectedResult.fieldName.errorMessage = joiResult.error.message;
    expectedResult.fieldName.errorHeading = joiResult.error.message;
    fields = setErrorFields(fieldName, fieldsObj, joiResult, errorContent);
    expect(fields).to.eql(expectedResult);
  });

  it('returns fields with invalid field error message', () => {
    joiResult.error.message = errorContent.notValidHeading;
    joiResult.error.details[0].type = 'any.invalid';
    expectedResult.fieldName.errorMessage = joiResult.error.message;
    expectedResult.fieldName.errorHeading = joiResult.error.message;
    fields = setErrorFields(fieldName, fieldsObj, joiResult, errorContent);
    expect(fields).to.eql(expectedResult);
  });
});
