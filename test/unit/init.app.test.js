const app = require('app');
const request = require('supertest');
const {expect} = require('util/chai-sinon');

describe('Node.js application/server', () => {

    let express;

    beforeEach(function() {
        express = app.init();
    });

    afterEach(() => {
        express.server.close();
    });

    describe('the application after initialisation', function() {

        it('should define a node application that emits events', () => {
            expect(express.app.constructor.name).to.equal('EventEmitter');
        });

        it('should define a node http.Server', () => {
            expect(express.server.constructor.name).to.equal('Server');
        });

    });

    describe('making HTTP application requests', function() {

        it('should redirect to /trackyourappeal when a request is made to root', function(done) {
            request(express.app)
                .get('/')
                .expect(302)
                .expect('Location', 'trackyourappeal')
                .end(done)
        });

        it('should respond to /trackyourappeal/?id=xxxxxx route with a HTTP 200:OK', function(done) {
            request(express.app)
                .get('/trackyourappeal/?id=tt48i5')
                .expect(200, done);
        });

        it('should respond to /abouthearing route with a HTTP 200:OK', function(done) {
            request(express.app)
                .get('/abouthearing')
                .expect(200, done);
        });

        it('should respond to an unknown route with a HTTP 404:Not found', function(done) {
            request(express.app)
                .get('/foo')
                .expect(404, done);
        });
    })
});