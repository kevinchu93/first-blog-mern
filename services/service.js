const mongoose      = require('mongoose');
const Post          = require('../models/post');


mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://test:test@ds257627.mlab.com:57627/first-blog-mern', { useMongoClient: true });


class service {

    promiseFind() {
        Post.find({}, function(err, data) {
            if (err) throw (err);
            Data = data;
            return Promise.resolve();
        });
    };

    getAllPosts() {
        promiseFind().then(() => {
            return Data
        });
    };

};


const dataService = new service();

const result = dataService.getAllPosts();
console.log(result);

module.exports = service;
