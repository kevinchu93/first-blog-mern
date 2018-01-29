const mongoose      = require('mongoose');
const Post          = require('../models/post');


mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://test:test@ds257627.mlab.com:57627/first-blog-mern', { useMongoClient: true });


class service {

    constructor()
    {
        this.Data = {};
    }

    
    getOnePost(req) {
        return Post.find({_id: req.params.post_id});
    };


    getAllPosts() {
        return Post.find({});
    };

    postNewPost(req) {
        return Post(req.body).save();
    };

};



module.exports = service;
