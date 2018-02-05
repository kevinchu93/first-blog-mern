const express = require('express');
const postController = require('./controllers/postController');
const mongoose = require('mongoose');

const app = express();

mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://test:test@ds257627.mlab.com:57627/first-blog-mern', { useMongoClient: true });

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use('', postController);

app.listen(3000);
