const bodyParser = require('body-parser');
const PostService = require('../services/PostService');
const express = require('express');

const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const postService = new PostService();

router.get(['/', '/posts'], (req, res) => {
  postService.getAllPosts().then((posts) => {
    res.render('posts', { posts: posts });
  }).catch((err) => {
    res.status(503).send(err.message);
  });
});

router.get('/posts/:post_id', (req, res) => {
  postService.getOnePost(req.params.post_id).then((post) => {
    res.render('post_detail', { post: post });
  }).catch((err) => {
    res.status(503).send(err.message);
  });
});

router.get('/post_new', (req, res) => {
  res.render('post_new');
});

router.post('/post_new', urlencodedParser, (req, res) => {
  postService.createNewPost(req.body.title, req.body.author, req.body.body).then(() => {
    res.redirect('posts');
  }).catch((err) => {
    res.status(503).send(err.message);
  });
});

module.exports = router;
