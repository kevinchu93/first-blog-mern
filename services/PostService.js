const Post = require('../models/Post');

class PostService {
  getOnePost(postId) {
    return Post.find({ _id: postId });
  }

  getAllPosts() {
    return Post.find({});
  }

  createNewPost(title, author, body) {
    return Post({ title, author, body }).save();
  }
}

//Post({ title: 'susy', author: 'ball', body: 'fun' }).save();

module.exports = PostService;
