/* global it, describe */
const express = require('express');
const request = require('supertest');
const postController = require('../controllers/postController');
const mongoose = require('mongoose');
const sinon = require('sinon');
const postService = require('../services/postService');

const app = express();

mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://test:test@ds257627.mlab.com:57627/first-blog-mern', { useMongoClient: true });

app.set('view engine', 'ejs');
app.use(express.static('../public'));

app.use('', postController);
app.listen(3000);


describe('postController', () => {
  describe('GET /', () => {
    it('should respond with homepage', (done) => {
      const stub = sinon.stub(postService, 'getAllPosts').resolves('expected');
      request(app)
        .get('/')
        .expect(200)
        .expect('Content-Type', 'text/html; charset=utf-8')
        .expect(/My First Blog/)
        .end((err) => {
          stub.restore();
          if (err) return done(err);
          return done();
        });
    });
  });
  describe('GET /posts', () => {
    it('should respond with homepage', (done) => {
      const stub = sinon.stub(postService, 'getAllPosts').resolves('expected');
      request(app)
        .get('/posts')
        .expect(200)
        .expect('Content-Type', 'text/html; charset=utf-8')
        .expect(/My First Blog/)
        .end((err) => {
          stub.restore();
          if (err) return done(err);
          return done();
        });
    });
  });
  describe('GET /posts/:post_id', () => {
    it('should respond with post detail', (done) => {
      const stub = sinon.stub(postService, 'getOnePost').resolves('expected');
      request(app)
        .get('/posts/post_id')
        .expect(200)
        .expect('Content-Type', 'text/html; charset=utf-8')
        .expect(/My First Blog/)
        .end((err) => {
          stub.restore();
          if (err) return done(err);
          return done();
        });
    });
  });
  describe('GET /post_new', () => {
    it('should respond with new post page', (done) => {
      request(app)
        .get('/post_new')
        .expect(200)
        .expect('Content-Type', 'text/html; charset=utf-8')
        .expect(/New Post/, done);
    });
  });
  describe('POST /post_new', () => {
    it('should respond with all posts page after creating a new post', (done) => {
      const expected = sinon.mock();
      const stub = sinon.stub(postService, 'createNewPost').returns(expected);
      stub.restore();
      request(app)
        .post('/post_new')
        .send({ title: 'title', author: 'author', body: 'body' })
        .expect(302)
        .expect('Content-Type', 'text/plain; charset=utf-8')
        .expect('Location', 'posts', done);
    });
  });
});
