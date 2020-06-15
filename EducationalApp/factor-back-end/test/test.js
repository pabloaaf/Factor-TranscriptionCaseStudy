const request = require('supertest');
const app = require('../src/app.js');

describe('GET /', function() {
    it('respond with hello world', function(done) {
        request(app).get('/courses').end(function(err, res) {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('array');
            done();
        });
    });
});
