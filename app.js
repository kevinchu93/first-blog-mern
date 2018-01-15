var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var urlencdedParser = bodyParser.urlencoded({ extended: false });

var data = require('./models/post');

app.set('view engine', 'ejs');
app.get('/', function(req, res){
    res.render('index');
});

app.get('/posts', function(req, res){
    res.render('posts', {posts: data});
});


app.listen(3000);
