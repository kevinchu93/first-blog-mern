const bodyParser = require('body-parser');
const postService = require('./service');
const express = require('express');

const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

/**
 *  @swagger
 *  definitions:
 *    Post:
 *      required:
 *        - "title"
 *        - "body"
 *      properties:
 *        _id:
 *          type: "string"
 *          example: "1234567890"
 *        title:
 *          type: "string"
 *          example: "First"
 *        author:
 *          type: "string"
 *          default: "Anonymous"
 *          example: "Me"
 *        body:
 *          type: "string"
 *          example: "First Post"
 */

/**
 *    @swagger
 *    /posts:
 *      x-swagger-router-controller: postService
 *      get:
 *        tags:
 *        - "post"
 *        summary: "Finds all posts"
 *        operationId: "getAllPosts"
 *        description: "Returns all posts"
 *        responses:
 *          200:
 *            description: "Success"
 *            schema:
 *              type: "array"
 *              items:
 *                $ref: "#/definitions/Post"
 *          503:
 *            description: "cannot GET /posts"
 */

router.get(['/', '/posts'], (req, res) => {
  postService.getAllPosts().then((posts) => {
    res.json(posts);
  }).catch((err) => {
    res.status(503).send(err.message);
  });
});

/**
 *    @swagger
 *    /posts/{_id}:
 *      x-swagger-router-controller: postService
 *      get:
 *        tags:
 *        - "post"
 *        summary: "Find post by ID"
 *        operationId: "getOnePost"
 *        description: "Returns a single post"
 *        parameters:
 *        - name: "_id"
 *          in: "path"
 *          required: true
 *          description: "ID of post"
 *          type: "string"
 *        responses:
 *          200:
 *            description: "successfully found post"
 *            schema:
 *              $ref: "#/definitions/Post"
 *          503:
 *            description: "cannot GET /posts/post_id"
 */

router.get('/posts/:post_id', (req, res) => {
  postService.getOnePost(req.params.post_id).then((post) => {
    res.json(post);
  }).catch((err) => {
    res.status(503).send(err.message);
  });
});

router.get('/post_new', (req, res) => {
  res.render('post_new');
});

/**
 *    @swagger
 *    /post_new:
 *      x-swagger-router-controller: postService
 *      post:
 *        tags:
 *        - "post"
 *        summary: "Creates a new post"
 *        operationId: "createNewPost"
 *        description: "Returns a new post"
 *        parameters:
 *        - name: "body"
 *          in: "body"
 *          required: true
 *          schema:
 *            $ref: "#/definitions/Post"
 *        responses:
 *          200:
 *            description: "successfully created new post"
 *            schema:
 *              $ref: "#/definitions/Post"
 *          503:
 *            description: "cannot POST /posts"
 *
 */

router.post('/post_new', urlencodedParser, (req, res) => {
  postService.createNewPost(req.body.title, req.body.author, req.body.body).then(() => {
    res.redirect('posts');
  }).catch((err) => {
    res.status(503).send(err.message);
  });
});

module.exports = router;
