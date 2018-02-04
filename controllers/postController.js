const bodyParser = require('body-parser');
const PostService = require('../services/PostService');
const express = require('express');

const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get(['/', '/posts'], (req, res) => {
  PostService.getAllPosts().then((posts) => {
    res.render('posts', { posts });
  }).catch((err) => {
    res.status(503).send(err.message);
  });
});

router.get('/posts/:post_id', (req, res) => {
  PostService.getOnePost(req.params.post_id).then((post) => {
    res.render('post_detail', { post });
  }).catch((err) => {
    res.status(503).send(err.message);
  });
});

router.get('/post_new', (req, res) => {
  res.render('post_new');
});

router.post('/post_new', urlencodedParser, (req, res) => {
  PostService.createNewPost(req.body.title, req.body.author, req.body.body).then(() => {
    res.redirect('posts');
  }).catch((err) => {
    res.status(503).send(err.message);
  });
});

module.exports = router;
