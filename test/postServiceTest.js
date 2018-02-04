/* global it, describe */
const sinon = require('sinon');
const assert = require('assert');
const Post = require('../models/Post');
const PostService = require('../services/PostService');

describe('PostService', () => {
  describe('getOnePost(post_id)', () => {
    it('should return correct post', () => {
      const expected = sinon.mock();
      const stub = sinon.stub(Post, 'findById').returns(expected);
      const post = PostService.getOnePost(5);
      assert.equal(post, expected);
      stub.restore();
    });
    it('should call function findById with correct parameters', () => {
      const stub = sinon.stub(Post, 'findById');
      PostService.getOnePost(5);
      sinon.assert.calledWith(stub, 5);
      stub.restore();
    });
  });
});
