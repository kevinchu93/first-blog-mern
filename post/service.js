const Post = require('../models/Post');

const postService = {
  getOnePost: postId => Post.findById(postId, { __v: false }),

  getAllPosts: () => Post.find({}, { __v: false }),

  createNewPost: (title, author, body) => Post.create({ title, author, body }),
};

module.exports = postService;
