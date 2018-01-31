const Post = require('../models/Post');

class PostService {
  getOnePost(postId) {
    return Post.findById(postId);
  }

  getAllPosts() {
    return Post.find({});
  }

  createNewPost(title, author, body) {
    return post = new Post({ title, author, body }).save();
  }
}

module.exports = PostService;
