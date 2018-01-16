var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

var data = require('./models/post');

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.get('/', function(req, res){
    res.render('index');
});

app.get('/posts', function(req, res){
    res.render('posts', {posts: data});
    console.log(req.path);
});

app.get('/posts/:post_id', function(req, res){
    res.render('post_detail', {post: data[req.params.post_id]});
    console.log(req.params.post_id);
    console.log('hello');
});

    

app.get('/post_new', function(req, res){
    res.render('post_new');
});

app.post('/post_new', urlencodedParser, function(req, res){
    data.push(req.body);
    res.render('posts', {posts: data});
    res.json(data);
});


app.listen(3000);
