const app = require('app');
const request = require('supertest');
const {expect} = require('util/chai-sinon');

describe('the node application/server', () => {

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

        it('should respond to application route', function(done) {
            request(express.app)
                .get('/')
                .expect(200, done);
        });

        it('should respond with a "HTTP 404:Not found" when encountering an unknown route', function(done) {
            request(express.app)
                .get('/foo')
                .expect(404, done);
        });
    })
});