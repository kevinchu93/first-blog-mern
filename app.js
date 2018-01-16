var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Connect to database
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://test:test@ds257627.mlab.com:57627/first-blog-mern');

var Post = require('./models/post.js');


var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('posts');
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
    var newPost = Post(req.body).save(function(err, data){
        if (err) throw (err);
        res.redirect('posts');
    });
});


app.listen(3000);
