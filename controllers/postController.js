const bodyParser    = require('body-parser');
const mongoose      = require('mongoose');
const Post          = require('../models/post');
const PostService   = require('../services/PostService');
const express       = require('express');


const router        = express.Router();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

// Connect to database
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://test:test@ds257627.mlab.com:57627/first-blog-mern', { useMongoClient: true });

const postService = new PostService();


router.get(['/', '/posts'], (req, res) => {
    postService.getAllPosts().then(posts => {
        res.render('posts', {posts: posts});
    }).catch(() => {
        res.status(500).send('Service Unavailable')
    });
});

router.get('/posts/:post_id', (req, res) => {
    postService.getOnePost(req.params.post_id).then((post) => {
        res.render('post_detail', {post: post});
    }).catch(() => {
        res.status(500).send('Service Unavailable')
    });
});

router.get('/post_new', (req, res) => {
    res.render('post_new');
});

router.post('/post_new', urlencodedParser, (req, res) => {
    // get data from view and add to mongodb
    postService.postNewPost(req.body).then((post) => {
        res.redirect('posts');
    }).catch(() => {
        res.status(500).send('Service Unavailable')
    });
});


module.exports = router;
