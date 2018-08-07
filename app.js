require('dotenv').config();
const express = require('express');
const postController = require('./post/controller');
const mongoose = require('mongoose');

const app = express();

mongoose.Promise = require('bluebird');

mongoose.connect(`mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE}`, { useMongoClient: true });

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use('/api', postController);

app.listen(process.env.PORT || 3000);

module.exports = app;
