var chai = require('chai');
var expect = require('chai').expect;
var chaiHttp = require('chai-http');

var frontendURL = process.env.SSCS_TYA_FRONTEND_URL;
var backendURL = process.env.SSCS_TYA_BACKEND_URL;

chai.use(chaiHttp);
chai.request.Request = chai.request.Test;
require('superagent-proxy')(chai.request);

var healthcheckProxyRequest = function(url) {
  var req = chai.request(url).get('health');
  if (typeof(proxy) !== 'undefined') {
    req = req.proxy(proxy)
  }
  return req;
};

describe('sscs tya health check', function () {

  it('Returns a 200 status code for frontend service check', function (done) {

    healthcheckProxyRequest(frontendURL).end(function (err, res) {
      expect(res).to.have.status(200);
      done();
    });
  });

  it('Returns a 200 status code for tya backend service check', function (done) {

    healthcheckProxyRequest(backendURL).end(function (err, res) {
      expect(res).to.have.status(200);
      done();
    });
  });

});
