const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./models/post.js');

const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// Connect to database
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://test:test@ds257627.mlab.com:57627/first-blog-mern');

module.exports = app => {

    app.use(express.static('public'));

    app.set('view engine', 'ejs');


    app.get('/', function(req, res){
        Post.find({}, function(err, data){
            if (err) throw (err);
            res.render('posts', {posts: data});
        });
    });


    app.get('/posts', function(req, res){
        //get data from mongodb and pass to view
        Post.find({}, function(err, data){
            if (err) throw (err);
            res.render('posts', {posts: data});
        });
    });

    app.get('/posts/:post_id', function(req, res){
        Post.find({_id: req.params.post_id}, function(err, data){
            if (err) throw (err);
            res.render('post_detail', {post: data});
        });
    });

        

    app.get('/post_new', function(req, res){
        res.render('post_new');
    });

    app.post('/post_new', urlencodedParser, function(req, res){
        // get data from view and add to mongodb
        const newPost = Post(req.body).save(function(err, data){
            if (err) throw (err);
            res.redirect('posts');
        });
    });
};
