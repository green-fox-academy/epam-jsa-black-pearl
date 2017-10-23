const assert = require('assert');
let supertest = require('supertest');
let server = supertest.agent('http://localhost:3000');
const badRequest = 400;
const statusOK = 200;
const forbidden = 403;

describe('Test Login', function() {
  it('login success', function(done) {
    server
      .post('/api/login')
      .send({'username': 'test@test.com', 'password': '123456'})
      .expect('Content-type', /json/)
      .expect(statusOK)
      .end(function(err, res) {
        assert.equal(res.status, statusOK);
        done();
      });
  });
  it('email || password not match', function(done) {
    server
      .post('/api/login')
      .send({'username': 'test@test.com', 'password': '12345678'})
      .expect('Content-type', /json/)
      .expect(forbidden)
      .end(function(err, res) {
        assert.equal(res.status, forbidden);
        assert.equal(res.body.message, 'Bad credential!');
        done();
      });
  });
  it('email || password miss field', function(done) {
    server
      .post('/api/login')
      .send({'username': 'test@test.com'})
      .expect('Content-type', /json/)
      .expect(badRequest)
      .end(function(err, res) {
        assert.equal(res.status, badRequest);
        assert.equal(res.body.message, 'Missing field(s)!');
        done();
      });
  });
});
