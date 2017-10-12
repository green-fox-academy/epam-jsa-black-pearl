const assert = require('assert');
let supertest = require('supertest');
let server = supertest.agent('http://localhost:3000');

describe('Test Login', function() {
  it('login success', function(done) {
    server
      .post('/api/login')
      .send({'username': 'test@test.com', 'password': '123456'})
      .expect('Content-type', /json/)
      .expect(200)
      .end(function(err, res) {
        assert.equal(res.status, 200);
        done();
      });
  });
  it('email || password not match', function(done) {
    server
      .post('/api/login')
      .send({'username': 'test@test.com', 'password': '12345678'})
      .expect('Content-type', /json/)
      .expect(403)
      .end(function(err, res) {
        assert.equal(res.status, 403);
        assert.equal(res.body.message, 'Bad credential!');
        done();
      });
  });
  it('email || password miss field', function(done) {
    server
      .post('/api/login')
      .send({'username': 'test@test.com'})
      .expect('Content-type', /json/)
      .expect(400)
      .end(function(err, res) {
        assert.equal(res.status, 400);
        assert.equal(res.body.message, 'Missing field(s)!');
        done();
      });
  });
});
