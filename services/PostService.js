const mongoose      = require('../mongoose');
const Post          = require('../models/Post');

class PostService {
    getOnePost(post_id) {
        return Post.find({_id: post_id});
    };

    getAllPosts() {
        return Post.find({});
    };

    postNewPost(title, author, body) {
        const newPost = new Post({title: title, author: author, body: body});
        return Post(newPost).save();
    };
};

module.exports = PostService;
