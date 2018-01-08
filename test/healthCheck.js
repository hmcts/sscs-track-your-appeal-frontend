const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');

const frontendURL = process.env.SSCS_TYA_FRONTEND_URL;
const backendURL = process.env.SSCS_TYA_BACKEND_URL || "http://localhost:8080/";

chai.use(chaiHttp);
chai.request.Request = chai.request.Test;
require('superagent-proxy')(chai.request);

const healthcheckProxyRequest = function(url) {
  let req = chai.request(url).get('health');
  if (typeof(proxy) !== 'undefined') {
    req = req.proxy(proxy)
  }
  return req;
};

const healthcheckProxyRequestFrontEnd = function(url) {
  let req = chai.request(url).get('status');
  if (typeof(proxy) !== 'undefined') {
    req = req.proxy(proxy)
  }
  return req;
};

describe('sscs tya health check', function () {

  it('Returns a 200 status code for TYA frontend service', function (done) {

    healthcheckProxyRequestFrontEnd(frontendURL).end(function (err, res) {
      expect(res).to.have.status(200);
      done();
    });
  });

  it('Returns a 200 status code for TYA backend service', function (done) {

    healthcheckProxyRequest(backendURL).end(function (err, res) {
      expect(res).to.have.status(200);
      done();
    });
  });

  it('Returns status UP', function (done) {
    healthcheckProxyRequest(backendURL).end(function (err, res) {
      expect(res.body.health.status).to.deep.equal('UP');
      done();
    });
  });
});
