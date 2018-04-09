const express = require('express');
const request = require('supertest');
const postController = require('../controllers/postController');
const sinon = require('sinon');
const postService = require('../services/postService');
const Post = require('../models/Post');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('../public'));

app.use('', postController);

describe('postController', () => {
  const mockPosts = [];

  for (let i = 0; i < 3; i += 1) {
    mockPosts[i] = new Post({
      title: `post${i + 1}`,
      author: `author${i + 1}`,
      body: `body${i + 1}`,
    });
  }

  beforeEach(() => {
    sinon.stub(postService, 'getAllPosts').resolves(mockPosts);
    sinon.stub(postService, 'getOnePost').resolves(mockPosts[0]);
    sinon.stub(postService, 'createNewPost').resolves();
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
        .expect(200)
        .expect(() => {
          sinon.assert.calledWith(postService.getAllPosts);
        })
    ));
    it('should return resolved result of "postService.getAllPosts" to view', () => (
      request(app)
        .get('/')
        .expect(200)
        .expect(/post1/)
        .expect(/author1/)
        .expect(/body1/)
        .expect(/post2/)
        .expect(/author2/)
        .expect(/body2/)
        .expect(/post3/)
        .expect(/author3/)
        .expect(/body3/)
    ));
    it('should return error when "postService.getAllPosts" rejects', () => {
      postService.getAllPosts.restore();
      sinon.stub(postService, 'getAllPosts').rejects();
      return request(app)
        .get('/')
        .expect(503);
    });
  });
  describe('GET /posts', () => {
    it('should call method "postService.getAllPosts" with no arguments', () => (
      request(app)
        .get('/posts')
        .expect(200)
        .expect(() => {
          sinon.assert.calledWith(postService.getAllPosts);
        })
    ));
    it('should return resolved result of "postService.getAllPosts" to view', () => (
      request(app)
        .get('/posts')
        .expect(200)
        .expect(/post1/)
        .expect(/author1/)
        .expect(/body1/)
        .expect(/post2/)
        .expect(/author2/)
        .expect(/body2/)
        .expect(/post3/)
        .expect(/author3/)
        .expect(/body3/)
    ));
    it('should return error when "postService.getAllPosts" rejects', () => {
      postService.getAllPosts.restore();
      sinon.stub(postService, 'getAllPosts').rejects();
      return request(app)
        .get('/posts')
        .expect(503);
    });
  });
  describe('GET /posts/:post_id', () => {
    it('should call method "postService.getOnePost" with correct arguments', () => (
      request(app)
        .get('/posts/post_id')
        .expect(200)
        .expect(() => {
          sinon.assert.calledWith(postService.getOnePost, 'post_id');
        })
    ));
    it('should return resolved result of "postService.getOnePost" to view', () => (
      request(app)
        .get('/posts/post_id')
        .expect(200)
        .expect(/post1/)
        .expect(/author1/)
        .expect(/body1/)
    ));
    it('should return error when "postService.getOnePost" rejects', () => {
      postService.getOnePost.restore();
      sinon.stub(postService, 'getOnePost').rejects();
      return request(app)
        .get('/posts/post_id')
        .expect(503);
    });
  });
  describe('GET /post_new', () => {
    it('should return "post_new" view', () => (
      request(app)
        .get('/post_new')
        .expect(200)
        .expect('Content-Type', 'text/html; charset=utf-8')
        .expect(/New Post/)
    ));
  });
  describe('POST /post_new', () => {
    it('should call method "postService.createNewPost" with correct arguments', () => (
      request(app)
        .post('/post_new')
        .type('form')
        .send({ title: 'title', author: 'author', body: 'body' })
        .expect(302)
        .expect(() => {
          sinon.assert.calledWith(postService.createNewPost, 'title', 'author', 'body');
        })
    ));
    it('should redirect to "posts" view after creating post', () => (
      request(app)
        .post('/post_new')
        .expect(302)
        .expect('Location', 'posts')
    ));
    it('should return error when "postService.createNewPost" rejects', () => {
      postService.createNewPost.restore();
      sinon.stub(postService, 'createNewPost').rejects();
      return request(app)
        .post('/post_new')
        .expect(503);
    });
  });

  // Nav Tests
  describe('GET /', () => {
    it('should respond with homepage', () => (
      request(app)
        .get('/')
        .expect(200)
        .expect('Content-Type', 'text/html; charset=utf-8')
        .expect(/My First Blog/)
    ));
  });
  describe('GET /posts', () => {
    it('should respond with homepage', () => (
      request(app)
        .get('/posts')
        .expect(200)
        .expect('Content-Type', 'text/html; charset=utf-8')
        .expect(/My First Blog/)
    ));
  });
  describe('GET /posts/:post_id', () => {
    it('should respond with post detail', () => (
      request(app)
        .get('/posts/post_id')
        .expect(200)
        .expect('Content-Type', 'text/html; charset=utf-8')
        .expect(/My First Blog/)
    ));
  });
});
