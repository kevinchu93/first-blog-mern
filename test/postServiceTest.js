/* global it, describe */
const sinon = require('sinon');
const assert = require('assert');
const Post = require('../models/Post');
const PostService = require('../services/PostService');

describe('PostService', () => {
  describe('getOnePost(post_id)', () => {
    it('should return correct post', () => {
      const stub = sinon.stub(Post, 'findById').returns(5);
      const post = PostService.getOnePost(5);
      assert.equal(post, 5);
      stub.restore();
    });
    it('should be called with correct parameters', () => {
      const stub = sinon.stub(Post, 'findById');
      PostService.getOnePost(5);
      sinon.assert.calledWith(stub, 5);
      stub.restore();
    });
  });
  describe('getAllPosts()', () => {
    it('should be called with no parameters', () => {
      const stub = sinon.stub(Post, 'find');
      PostService.getAllPosts();
      sinon.assert.calledWith(stub);
      stub.restore();
    });
  });
  describe('createNewPost(title, author, body)', () => {
    it('should be called with correct parameters', () => {
      const stub = sinon.stub(Post, 'create');
      PostService.createNewPost('intro', 'kevin', 'hello');
      sinon.assert.calledWith(stub, { title: 'intro', author: 'kevin', body: 'hello' });
      stub.restore();
    });
  });
});
