/* global it, describe */
const express = require('express');
const request = require('supertest');
const postController = require('../controllers/postController');
const sinon = require('sinon');
const postService = require('../services/postService');
const assert = require('assert');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('../public'));

app.use('', postController);

describe('postController', () => {
  let stubGetAllPosts = sinon.stub();
  let stubGetOnePost = sinon.stub();
  let stubCreateNewPost = sinon.stub();

  beforeEach(() => {
    stubGetAllPosts = sinon.stub(postService, 'getAllPosts').resolves('expected');
    stubGetOnePost = sinon.stub(postService, 'getOnePost').resolves('expected');
    stubCreateNewPost = sinon.stub(postService, 'createNewPost').returns(Promise.resolve('expected'));
  });

  afterEach(() => {
    stubGetAllPosts.restore();
    stubGetOnePost.restore();
    stubCreateNewPost.restore();
  });

  describe('GET /', () => {
    it('should call method "postService.getAllPosts" with no arguments', (done) => {
      request(app)
        .get('/')
        .end((err) => {
          sinon.assert.calledWith(stubGetAllPosts);
          if (err) return done(err);
          return done();
        });
    });
  });
  describe('GET /', () => {
    it('should return correct "posts" in promise', (done) => {
      request(app)
        .get('/')
        .end((err) => {
          stubGetAllPosts().then((posts) => {
            assert.equal(posts, 'expected');
            if (err) return done(err);
            return done();
          });
        });
    });
  });
  describe('GET /posts', () => {
    it('should call method "postService.getAllPosts" with no arguments', (done) => {
      request(app)
        .get('/posts')
        .end((err) => {
          sinon.assert.calledWith(stubGetAllPosts);
          if (err) return done(err);
          return done();
        });
    });
  });
  describe('GET /posts', () => {
    it('should return correct "posts" in promise', (done) => {
      request(app)
        .get('/posts')
        .end((err) => {
          stubGetAllPosts().then((posts) => {
            assert.equal(posts, 'expected');
            if (err) return done(err);
            return done();
          });
        });
    });
  });
  describe('GET /posts/:post_id', () => {
    it('should call method "postService.getOnePost" with correct arguments', (done) => {
      request(app)
        .get('/posts/post_id')
        .end((err) => {
          sinon.assert.calledWith(stubGetOnePost, 'post_id');
          if (err) return done(err);
          return done();
        });
    });
  });
  describe('GET /posts/:post_id', () => {
    it('should return correct "post" in promise', (done) => {
      request(app)
        .get('/post/post_id')
        .end((err) => {
          stubGetOnePost().then((post) => {
            assert.equal(post, 'expected');
            if (err) return done(err);
            return done();
          });
        });
    });
  });
  describe('POST /post_new', () => {
    it('should call method "postService.createNewPost" with correct arguments', (done) => {
      request(app)
        .post('/post_new')
        .type('form')
        .send({ title: 'title', author: 'author', body: 'body' })
        .end((err) => {
          sinon.assert.calledWith(stubCreateNewPost, 'title', 'author', 'body');
          if (err) return done(err);
          return done();
        });
    });
  });

  // Nav Tests
  describe('GET /', () => {
    it('should respond with homepage', (done) => {
      request(app)
        .get('/')
        .expect(200)
        .expect('Content-Type', 'text/html; charset=utf-8')
        .expect(/My First Blog/)
        .end((err) => {
          //          stub.restore();
          if (err) return done(err);
          return done();
        });
    });
  });
  describe('GET /posts', () => {
    it('should respond with homepage', (done) => {
      request(app)
        .get('/posts')
        .expect(200)
        .expect('Content-Type', 'text/html; charset=utf-8')
        .expect(/My First Blog/)
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
  });
  describe('GET /posts/:post_id', () => {
    it('should respond with post detail', (done) => {
      request(app)
        .get('/posts/post_id')
        .expect(200)
        .expect('Content-Type', 'text/html; charset=utf-8')
        .expect(/My First Blog/)
        .end((err) => {
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
        .expect(/New Post/)
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
  });
  describe('POST /post_new', () => {
    it('should respond with all posts page after creating a new post', (done) => {
      request(app)
        .post('/post_new')
        .send({ title: 'title', author: 'author', body: 'body' })
        .expect(302)
        .expect('Content-Type', 'text/plain; charset=utf-8')
        .expect('Location', 'posts')
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
  });
});
