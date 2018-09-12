const Joi = require('joi');
const { setErrorFields } = require('app/core/fieldErrors');

const minSurnameLength = 2;

const validateField = (surname, errors) => {
  const schema = Joi.string()
    .min(minSurnameLength)
    .required()
    .options({
      language: {
        any: {
          empty: `!!${errors.emptyStringHeading}`,
          invalid: `!!${errors.notValidHeading}`
        },
        string: { min: `!!${errors.notValidHeading}` }
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
  if (fields.error) {
    res.render('validate-surname', { id, fields, originalPage });
  } else {
    next();
  }
};

module.exports = { validateSurname };
