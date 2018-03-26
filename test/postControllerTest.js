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
  beforeEach(() => {
    sinon.stub(postService, 'getAllPosts').resolves('expected');
    sinon.stub(postService, 'getOnePost').resolves('expected');
    sinon.stub(postService, 'createNewPost').resolves('expected');
  });

  afterEach(() => {
    postService.getAllPosts.restore();
    postService.getOnePost.restore();
    postService.createNewPost.restore();
  });

  describe('GET /', () => {
    it('should call method "postService.getAllPosts" with no arguments', () => (
      request(app)
        .get('/')
        .then(() => {
          sinon.assert.calledWith(postService.getAllPosts);
        })
    ));
  });
  describe('GET /', () => {
    it('should return correct "posts" in promise', () => (
      request(app)
        .get('/')
        .then(() => {
          postService.getAllPosts().then((posts) => {
            assert.equal(posts, 'expected');
          });
        })
    ));
  });
  describe('GET /posts', () => {
    it('should call method "postService.getAllPosts" with no arguments', () => (
      request(app)
        .get('/posts')
        .then(() => {
          sinon.assert.calledWith(postService.getAllPosts);
        })
    ));
  });
  describe('GET /posts', () => {
    it('should return correct "posts" in promise', () => (
      request(app)
        .get('/posts')
        .then(() => {
          postService.getAllPosts().then((posts) => {
            assert.equal(posts, 'expected');
          });
        })
    ));
  });
  describe('GET /posts/:post_id', () => {
    it('should call method "postService.getOnePost" with correct arguments', () => (
      request(app)
        .get('/posts/post_id')
        .then(() => {
          sinon.assert.calledWith(postService.getOnePost, 'post_id');
        })
    ));
  });
  describe('GET /posts/:post_id', () => {
    it('should return correct "post" in promise', () => (
      request(app)
        .get('/post/post_id')
        .then(() => {
          postService.getOnePost().then((post) => {
            assert.equal(post, 'expected');
          });
        })
    ));
  });
  describe('POST /post_new', () => {
    it('should call method "postService.createNewPost" with correct arguments', () => (
      request(app)
        .post('/post_new')
        .type('form')
        .send({ title: 'title', author: 'author', body: 'body' })
        .then(() => {
          sinon.assert.calledWith(postService.createNewPost, 'title', 'author', 'body');
        })
    ));
  });

  // Nav Tests
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
      request(app)
        .get('/posts')
        .expect(200)
        .expect('Content-Type', 'text/html; charset=utf-8')
        .expect(/My First Blog/, done);
    });
  });
  describe('GET /posts/:post_id', () => {
    it('should respond with post detail', (done) => {
      request(app)
        .get('/posts/post_id')
        .expect(200)
        .expect('Content-Type', 'text/html; charset=utf-8')
        .expect(/My First Blog/, done);
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
      request(app)
        .post('/post_new')
        .send({ title: 'title', author: 'author', body: 'body' })
        .expect(302)
        .expect('Content-Type', 'text/plain; charset=utf-8')
        .expect('Location', 'posts', done);
    });
  });
});
