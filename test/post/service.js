const sinon = require('sinon');
const assert = require('assert');
const Post = require('../../models/Post');
const postService = require('../../post/service');

describe('postService', () => {
  describe('getOnePost(post_id)', () => {
    it('should call function "findById" with correct parameters', () => {
      const stub = sinon.stub(Post, 'findById');
      postService.getOnePost(5);
      sinon.assert.calledWith(stub, 5);
      stub.restore();
    });
    it('should return correct post', () => {
      const expected = sinon.mock();
      const stub = sinon.stub(Post, 'findById').returns(expected);
      const post = postService.getOnePost(5);
      assert.equal(post, expected);
      stub.restore();
    });
  });
  describe('getAllPosts()', () => {
    it('should call function "find" with no parameters', () => {
      const stub = sinon.stub(Post, 'find');
      postService.getAllPosts();
      sinon.assert.calledWith(stub);
      stub.restore();
    });
    it('should return correct posts', () => {
      const expected = sinon.mock();
      const stub = sinon.stub(Post, 'find').returns(expected);
      const posts = postService.getAllPosts();
      assert.equal(posts, expected);
      stub.restore();
    });
  });
  describe('createNewPost(title, author, body)', () => {
    it('should call function "create" with correct parameters', () => {
      const stub = sinon.stub(Post, 'create');
      postService.createNewPost('intro', 'kevin', 'hello');
      sinon.assert.calledWith(stub, { title: 'intro', author: 'kevin', body: 'hello' });
      stub.restore();
    });
    it('should return correct promise', () => {
      const expected = sinon.mock();
      const stub = sinon.stub(Post, 'create').returns(expected);
      const promise = postService.createNewPost('intro', 'kevin', 'hello');
      assert.equal(promise, expected);
      stub.restore();
    });
  });
});
