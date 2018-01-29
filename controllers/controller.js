const bodyParser    = require('body-parser');
const mongoose      = require('mongoose');
const Post          = require('../models/post');
const service       = require('../services/service');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

// Connect to database
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://test:test@ds257627.mlab.com:57627/first-blog-mern', { useMongoClient: true });

const dataService = new service();
module.exports = app => {
    


    app.get(['/', '/posts'], function(req, res) {
        dataService.getAllPosts().then(posts => {
            console.log(posts);
            res.render('posts', {posts: posts});
        }).catch({
            res.status(500);
        });
    });
    
    app.get('/posts/:post_id', function(req, res){
        dataService.getOnePost(req).then((post) => {
            res.render('post_detail', {post: post});
        });
    });

    app.get('/post_new', function(req, res){
        res.render('post_new');
    });

    app.post('/post_new', urlencodedParser, function(req, res){
        // get data from view and add to mongodb
        const newPost = dataService.postNewPost(req).then((post) => {
            res.redirect('posts');
        });
    });

/*
    app.post('/post_new', urlencodedParser, function(req, res){
        // get data from view and add to mongodb
        const newPost = Post(req.body).save(function(err, data){
            if (err) throw (err);
            res.redirect('posts');
        });
    });
*/
};
