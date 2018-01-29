const mongoose      = require('mongoose');
const Post          = require('../models/post');


mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://test:test@ds257627.mlab.com:57627/first-blog-mern', { useMongoClient: true });


class service {

    constructor()
    {
        this.Data = {};
    }

    

    promiseFind() {
        Post.find({}, (err, data) => {
            if (err) throw (err);
            this.Data = data;
            console.log('this should be first');
        });
        return Promise.resolve();
    };

    getAllPosts() {
        return Post.find({});
    };
};


const dataService = new service();

const result = dataService.getAllPosts();
console.log('this should be last');
console.log(result);

module.exports = service;
