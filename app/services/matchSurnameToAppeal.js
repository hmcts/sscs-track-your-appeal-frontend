const request = require('superagent');
const { appealsAPI } = require('app/config');
const HttpStatus = require('http-status-codes');

const matchSurnameToAppeal = (req, res, next) => {

  const mactoken = req.params.mactoken;
  const surname = req.body.surname;

  request.get(`${appealsAPI}/validate/${mactoken}/${surname}`)
    .then(result => {

    })
    .catch(error => {
      console.log('----------------------');
      console.log(error);
    });

};

module.exports = { matchSurnameToAppeal };
