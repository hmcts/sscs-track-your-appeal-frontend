const setErrorFields = (field, fields, result, errors) => {
  fields.error = true;
  fields[field].error = true;
  fields[field].errorMessage = result.error.message;

  const type = result.error.details[0].type;
  fields[field].errorHeading = (type === 'any.empty') ?
    errors.emptyStringHeading : errors.notValidHeading;

  return fields;
};

module.exports = { setErrorFields };