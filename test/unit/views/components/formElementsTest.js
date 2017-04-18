const {expect} = require('test/chai-sinon');
const nunjucks = require('nunjucks');


describe(`Text fields should render as expected`, () => {

  const textField = `
    {% from "app/views/components/formElements.html" import textField %}
    {{ textField(label, hint, field, name) }}
  `;

  it('name, field and label are rendered correctly', () => {

    let input = {
      label: 'testLabel',
      field: { value: 'some text' },
      name: 'testName',
    };

    const res = nunjucks.renderString(textField, input);

    expect(res).to.contain('<label class="form-label" for="testName">testLabel</label>');
    expect(res).to.contain('id="testName');
    expect(res).to.contain('name="testName"');
    expect(res).to.contain(input.field.value);
    expect(res).to.not.contain('<span class="form-hint">');

  });

  it('errors are shown if present', () => {
    let input = {
      label: 'testLabel',
      field: {
        value: 'some text',
        error: true,
        errorMessage: 'error-message'
      },
      name: 'testName',
    };

    const res = nunjucks.renderString(textField, input);

    expect(res).to.contain('<div class="form-group form-group-error">');
    expect(res).to.contain('<span class="error-message">');
    expect(res).to.contain(input.field.errorMessage);

  });

  it('hint is shown when present', () => {
    let input = {
      label: 'testLabel',
      hint: 'hint',
      field: { value: 'some text' },
      name: 'testName',
    };

    const res = nunjucks.renderString(textField, input);
    expect(res).to.contain('<span class="form-hint">');
    expect(res).to.contain(input.hint);

  });
});


describe(`Text areas should render as expected`, () => {

  const textArea = `
    {% from "app/views/components/formElements.html" import textArea %}
    {{ textArea(label, hint, field, name) }}
  `;


  it('name, field and label are rendered correctly', () => {

    let input = {
      label: 'testLabel',
      field: { value: 'some text' },
      name: 'testName',
    };

    const res = nunjucks.renderString(textArea, input);

    expect(res).to.contain('<label class="form-label" for="testName">testLabel</label>');
    expect(res).to.contain('id="testName');
    expect(res).to.contain('name="testName"');
    expect(res).to.contain(input.field.value);
    expect(res).to.not.contain('<span class="form-hint">');

  });

  it('errors are shown if present', () => {
    let input = {
      label: 'testLabel',
      field: {
        value: 'some text',
        error: true,
        errorMessage: 'error-message'
      },
      name: 'testName',
    };

    const res = nunjucks.renderString(textArea, input);

    expect(res).to.contain('<div class="form-group form-group-error">');
    expect(res).to.contain('<span class="error-message">');
    expect(res).to.contain(input.field.errorMessage);

  });

  it('hint is shown when present', () => {
    let input = {
      label: 'testLabel',
      hint: 'hint',
      field: { value: 'some text' },
      name: 'testName',
    };

    const res = nunjucks.renderString(textArea, input);
    expect(res).to.contain('<span class="form-hint">');
    expect(res).to.contain(input.hint);

  });
});

describe(`Yes no radio buttons should render as expected`, () => {

  const yesNoRadioButton = `
    {% from "app/views/components/formElements.html" import yesNoRadio %}
    {{ yesNoRadio(hint, field, name) }}
  `;

  it('name, field and label are rendered correctly', () => {

    let input = {
      label: 'testLabel',
      name: 'testName',
      field: { value: 'Yes' }
    };

    const res = nunjucks.renderString(yesNoRadioButton, input);

    expect(res).to.not.contain('<legend>');
    expect(res).to.contain('id="testName_no');
    expect(res).to.contain('id="testName_yes');
    expect(res).to.contain('value="no"');

  });

  it('errors are shown if present', () => {

    let input = {
      label: 'testLabel',
      field: {
        value: 'Yes',
        error: true,
        errorMessage: "My Error Message"
      },
      name: 'testName'
    };

    const res = nunjucks.renderString(yesNoRadioButton, input);

    expect(res).to.contain('class="form-group form-group-error">');
    expect(res).to.contain('<span class="error-message">');
    expect(res).to.contain(input.field.errorMessage);

  });

  it('hint is shown when present', () => {
    let input = {
      label: 'testLabel',
      hint: 'hintText',
      field: { value: 'Yes' },
      name: 'testName'
    };

    const res = nunjucks.renderString(yesNoRadioButton, input);

    expect(res).to.contain('<span class="form-label">hintText</span>');

  });
});

describe(`Date fields should render as expected`, () => {

  const date = `
    {% from "app/views/components/formElements.html" import date %}
    {{ date(
      dayField = day,
      monthField = month,
      yearField = year,
      dateField = dateField,
      label = label,
      hint = hint,
      id = id,
      hiddenLegend = hiddenLegend,
      legend = legend
    )}}
  `;

  it('name, field and label are rendered correctly', () => {

    let input = {
      day:  { value: '01'  },
      month:{ value: '02'  },
      year: { value: '1980'},
      date: {},
      label: 'dateLabel',
      id: 'testDate'
    };

    const res = nunjucks.renderString(date, input);

    expect(res).to.contain('<span class="form-label">dateLabel</span>');
    expect(res).to.contain('name="day" value="01"');
    expect(res).to.contain('name="month" value="02"');
    expect(res).to.contain('name="year" value="1980"');
    expect(res).to.contain('id="testDate"');
    expect(res).to.not.contain('<legend class="form-label-bold">');
    expect(res).to.not.contain('<legend class="visually-hidden">');
    expect(res).to.not.contain('<span class="form-hint">');

  });

  it('errors are shown if present', () => {
    let input = {
      day: {
        value: '01',
        error: true,
        errorMessage: 'dayErrorMessage'
      },
      month: {
        value: '02',
        error: true,
        errorMessage: 'monthErrorMessage'
      },
      year: {
        value: '1980',
        error: true,
        errorMessage: 'yearErrorMessage'
      },
      dateField: {
        error: true,
        errorMessage: 'dateErrors'
      },
      label: 'dateLabel',
      id: 'testDate'
    };

    const res = nunjucks.renderString(date, input);


    expect(res).to.contain(input.day.errorMessage);
    expect(res).to.contain(input.month.errorMessage);
    expect(res).to.contain(input.year.errorMessage);
    expect(res).to.contain(input.dateField.errorMessage);
    expect(res).to.contain('<fieldset class="form-group form-date error" id="testDate">');

  });

  it('hint, legend and hidden legend are shown when present', () => {

    let input = {
      day: {},
      month: {},
      year: {},
      date: {},
      label: 'dateLabel',
      id: 'testDate',
      legend: 'testLegend',
      hiddenLegend: 'testHiddenLegend',
      hint: 'testHint'
    };


    const res = nunjucks.renderString(date, input);
    expect(res).to.contain(input.hint);
    expect(res).to.contain(input.legend);
    expect(res).to.contain(input.hiddenLegend);

  });
});
