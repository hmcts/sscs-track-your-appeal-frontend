const Joi = require('joi');

const validateSurname = (req, res, next) => {
  const mactoken = req.params.mactoken;
  const surname = req.body.surname;
  const errors = res.locals.i18n.validateSurname.surname.errors;
  const fields = validateField(surname, errors);
  if(fields.error) {
    console.log(fields);
    res.render('validate-surname', { mactoken, fields });
  } else {
    next();
  }
};

const validateField = (surname, errors) => {

  const schema = Joi.string().alphanum().required().options({
    language: {
      any: {
        empty: `!!${errors.emptyField}`,
        invalid: `!!${errors.invalid}`
      }
    }
  });

  let fields = {
    error: false,
    surname: { value: surname }
  };

  const surnameResult = schema.validate(surname);
  if (surnameResult.error) {
    fields = setErrorFields('surname', fields, surnameResult, errors);
  }

  return fields;

};

const setErrorFields = (field, fields, result, errors) => {
  fields.error = true;
  fields[field].error = true;
  fields[field].errorMessage = result.error.message;

  const type = result.error.details[0].type;
  fields[field].errorHeading = (type === 'any.empty') ?
    errors.emptyField : errors.invalid;

  return fields;
};

module.exports = { validateSurname };
