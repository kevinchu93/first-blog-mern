const bodyParser = require('body-parser');
const postService = require('./service');
const express = require('express');

const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/posts', (req, res) => {
  postService.getAllPosts().then((posts) => {
    res.json(posts);
  }).catch((err) => {
    res.status(503).send(err.message);
  });
});

router.get('/posts/:post_id', (req, res) => {
  postService.getOnePost(req.params.post_id).then((post) => {
    res.json(post);
  }).catch((err) => {
    res.status(503).send(err.message);
  });
});

router.post('/posts', urlencodedParser, (req, res) => {
  postService.createNewPost(req.body.title, req.body.author, req.body.body).then(() => {
    res.json({ message: 'Post Created!' });
  }).catch((err) => {
    res.status(503).send(err.message);
  });
});

module.exports = router;
