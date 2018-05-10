require('dotenv').config();
const express = require('express');
const postController = require('./post/controller');
const mongoose = require('mongoose');

const app = express();

mongoose.Promise = require('bluebird');

mongoose.connect(`${process.env.DATABASE}://${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}@${process.env.HOST}`, { useMongoClient: true });

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use('', postController);

app.listen(process.env.PORT);

module.exports = app;
