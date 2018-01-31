/* global it, describe */
const sinon = require('sinon');
const assert = require('assert');
const Post = require('../models/Post');

const PostService = require('../services/PostService');

describe('PostService', () => {
  describe('getOnePost(post_id)', () => {
    it('should return correct post', () => {
      const stub = sinon.stub(Post, 'find').returns(5);
      const sut = new PostService();
      const postId = sut.getOnePost(5);
      assert.equal(postId, 5);
      stub.restore();
    });
  });
});
