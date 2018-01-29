const mongoose      = require('mongoose');
const Post          = require('../models/post');


mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://test:test@ds257627.mlab.com:57627/first-blog-mern', { useMongoClient: true });


class Service {

    getOnePost(post_id) {
        return Post.find({_id: post_id});
    };


    getAllPosts() {
        return Post.find({});
    };

    postNewPost(newPost) {
        return Post(newPost).save();
    };

};



module.exports = Service;
