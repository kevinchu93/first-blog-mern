const Post = require('../models/Post');

const postService = {
  getOnePost: postId => Post.findById(postId),

  getAllPosts: () => Post.find({}),

  createNewPost: (title, author, body) => Post.create({ title, author, body }),
};

module.exports = postService;
