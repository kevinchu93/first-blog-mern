const bodyParser    = require('body-parser');
const mongoose      = require('mongoose');
const Post          = require('../models/post');
const service       = require('../services/service');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

// Connect to database
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://test:test@ds257627.mlab.com:57627/first-blog-mern', { useMongoClient: true });

const dataService = new service();
module.exports = (app) => {
    


    app.get(['/', '/posts'], (req, res) => {
        dataService.getAllPosts().then(posts => {
            res.render('posts', {posts: posts});
        }).catch(
            res.status(500);
        );
    });
    
    app.get('/posts/:post_id', (req, res) => {
        dataService.getOnePost(req.params.post_id).then((post) => {
            res.render('post_detail', {post: post});
        });
    });

    app.get('/post_new', (req, res) => {
        res.render('post_new');
    });

    app.post('/post_new', urlencodedParser, (req, res) => {
        // get data from view and add to mongodb
        dataService.postNewPost(req.body).then((post) => {
            res.redirect('posts');
        });
    });

};
