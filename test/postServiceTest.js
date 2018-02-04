/* global it, describe */
const sinon = require('sinon');
const assert = require('assert');
const Post = require('../models/Post');
const PostService = require('../services/PostService');

describe('PostService', () => {
  describe('getOnePost(post_id)', () => {
    it('should call function findById with correct parameters', () => {
      const stub = sinon.stub(Post, 'findById');
      PostService.getOnePost(5);
      sinon.assert.calledWith(stub, 5);
      stub.restore();
    });
    it('should return correct post', () => {
      const expected = sinon.mock();
      const stub = sinon.stub(Post, 'findById').returns(expected);
      const post = PostService.getOnePost(5);
      assert.equal(post, expected);
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
    it('should return correct posts', () => {
      const expected = sinon.mock();
      const stub = sinon.stub(Post, 'find').returns(expected);
      const posts = PostService.getAllPosts();
      assert.equal(posts, expected);
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
    it('should return correct promise', () => {
      const expected = sinon.mock();
      const stub = sinon.stub(Post, 'create').returns(expected);
      const promise = PostService.createNewPost('intro', 'kevin', 'hello');
      assert.equal(promise, expected);
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
