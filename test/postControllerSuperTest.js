/* global it, describe */
const request = require('supertest');

const app = require('../app');

describe('postController', function () {
  this.timeout(5000);
  describe('GET /', () => {
    it('should respond with homepage', (done) => {
      request(app)
        .get('/')
        .expect(200)
        .expect('Content-Type', 'text/html; charset=utf-8')
        .expect(/My First Blog/, done);
    });
  });
  describe('GET /posts', () => {
    it('should respond with homepage', (done) => {
      request(app).get('/posts')
        .expect(200)
        .expect('Content-Type', 'text/html; charset=utf-8')
        .expect(/My First Blog/, done);
    });
  });
  describe('GET /posts', () => {
    it('should respond with homepage', (done) => {
      request(app).get('/')
        .expect(200)
        .expect('Content-Type', 'text/html; charset=utf-8')
        .expect(/My First Blog/, done);
    });
  });
  describe('POST /post_new', () => {
    it('should respond with all posts page after creating a new post', (done) => {
      request(app).post('/post_new')
        .send({ title: 'title', author: 'author', body: 'body' })
        .expect(302)
        .expect('Content-Type', 'text/plain; charset=utf-8')
        .expect(/My First Blog/, done);
    });
  });
});
