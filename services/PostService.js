const Post = require('../models/Post');

class PostService {
  static getOnePost(postId) {
    return Post.findById(postId);
  }

  static getAllPosts() {
    return Post.find({});
  }

  static createNewPost(title, author, body) {
    return Post.create({ title, author, body });
  }
}

module.exports = PostService;
