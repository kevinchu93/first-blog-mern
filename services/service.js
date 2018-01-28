const mongoose      = require('mongoose');
const Post          = require('../models/post');


mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://test:test@ds257627.mlab.com:57627/first-blog-mern', { useMongoClient: true });


class service {

    getAllPosts() {
        let info = 'hello';
        //promise
        let transferData = function() {
            return new Promise((resolve, reject) => {

                Post.find({}, function(err, data) {
                    if (err) throw (err);
                    info = data;
                    console.log(data);
                });
                resolve();
            });
        };
        transferData().then(() => {
            return info;
        });
    };
};


const dataService = new service();

const result = dataService.getAllPosts();
console.log(result);

module.exports = service;
