const Joi = require('joi');
const { setErrorFields } = require('app/core/fieldErrors');

const surnameRegex = /^([a-zA-z]+([ '-][a-zA-Z]+)*){2,}$/;

const validateField = (surname, errors) => {
  const schema = Joi.string().regex(surnameRegex)
    .required()
    .options({
      language: {
        any: {
          empty: `!!${errors.emptyStringHeading}`,
          invalid: `!!${errors.notValidHeading}`
        },
        string: { regex: { base: `!!${errors.notValidHeading}` } }
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

const validateSurname = (req, res, next) => {

  const id = req.params.id;
  const originalPage = req.params.originalPage;
  const surname = req.body.surname;
  const errors = res.locals.i18n.validateSurname.surname.errors;
  const fields = validateField(surname, errors);
  console.log('a');
  if (fields.error) {
    res.render('validate-surname', { id, fields, originalPage });
  } else {
    console.log('next');
    next();
  }
};

module.exports = { validateSurname };
