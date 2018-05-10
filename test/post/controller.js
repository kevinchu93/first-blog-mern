const express = require('express');
const request = require('supertest');
const postController = require('../../post/controller');
const sinon = require('sinon');
const postService = require('../../post/service');
const Post = require('../../models/Post');
const assert = require('assert');

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
    sinon.stub(postService, 'createNewPost').resolves(mockPosts[0]);
  });

  afterEach(() => {
    postService.getAllPosts.restore();
    postService.getOnePost.restore();
    postService.createNewPost.restore();
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
    it('should return resolved result of "postService.getAllPosts" as json object', () => (
      request(app)
        .get('/posts')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
          assert.equal(res.body[0].title, 'post1');
          assert.equal(res.body[0].author, 'author1');
          assert.equal(res.body[0].body, 'body1');
          assert.equal(res.body[0]._id, mockPosts[0]._id);
          assert.equal(res.body[1].title, 'post2');
          assert.equal(res.body[1].author, 'author2');
          assert.equal(res.body[1].body, 'body2');
          assert.equal(res.body[1]._id, mockPosts[1]._id);
          assert.equal(res.body[2].title, 'post3');
          assert.equal(res.body[2].author, 'author3');
          assert.equal(res.body[2].body, 'body3');
          assert.equal(res.body[2]._id, mockPosts[2]._id);
        })
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
    it('should return resolved result of "postService.getOnePost" as json object', () => (
      request(app)
        .get('/posts/post_id')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
          assert.equal(res.body.title, 'post1');
          assert.equal(res.body.author, 'author1');
          assert.equal(res.body.body, 'body1');
          assert.equal(res.body._id, mockPosts[0]._id);
        })
    ));
    it('should return error when "postService.getOnePost" rejects', () => {
      postService.getOnePost.restore();
      sinon.stub(postService, 'getOnePost').rejects();
      return request(app)
        .get('/posts/post_id')
        .expect(503);
    });
  });
  describe('POST /post_new', () => {
    it('should call method "postService.createNewPost" with correct arguments', () => (
      request(app)
        .post('/posts')
        .type('form')
        .send({ title: 'title', author: 'author', body: 'body' })
        .expect(200)
        .expect(() => {
          sinon.assert.calledWith(postService.createNewPost, 'title', 'author', 'body');
        })
    ));
    it('should output correct json object after creating post', () => (
      request(app)
        .post('/posts')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
          assert.equal(res.body.title, 'post1');
          assert.equal(res.body.author, 'author1');
          assert.equal(res.body.body, 'body1');
        })
    ));
    it('should return error when "postService.createNewPost" rejects', () => {
      postService.createNewPost.restore();
      sinon.stub(postService, 'createNewPost').rejects();
      return request(app)
        .post('/posts')
        .expect(503);
    });
  });
});
