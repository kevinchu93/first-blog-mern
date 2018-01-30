const mocha = require('mocha');
const sinon = require('sinon');
const assert = require('assert');
const Post = require('../models/Post');
const mongoose = require('../mongoose');

const PostService = require('../services/PostService');

describe('PostService', () => {
    describe('getOnePost(post_id)', () => {
        it('should return correct post', () => {
            const stub = sinon.stub(Post, 'find').returns(5);
            const sut = new PostService();
            post_id = sut.getOnePost(5);
            assert.equal(post_id, 5);
            stub.restore();
        });
    });
});
