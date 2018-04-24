require('dotenv').config();
const express = require('express');
const postController = require('./post/controller');
const mongoose = require('mongoose');

const app = express();

mongoose.Promise = require('bluebird');

mongoose.connect(`mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@ds257627.mlab.com:57627/first-blog-mern`, { useMongoClient: true });

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use('', postController);

app.listen(3000);

module.exports = app;
