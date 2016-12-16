Feature('Track your Appeal Page Test');


  Scenario('Test Benifit Appeal page ', (I,IAmAtTrackAppeal,Properties) => {

    IAmAtTrackAppeal.benifitAppealPage();
    I.see('Mr S Smith');
    I.see('Appeal reference number: SC123/45/00001',Properties.fields.form_hint_css_path);
    I.see('Latest update');

  });
