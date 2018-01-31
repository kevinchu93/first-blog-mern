const Post = require('../models/Post');

class PostService {
  static getOnePost(postId) {
    return Post.findById(postId);
  }

  static getAllPosts() {
    return Post.find({});
  }

  static createNewPost(title, author, body) {
    const post = new Post({ title, author, body }).save();
    return post;
  }
}

module.exports = PostService;
