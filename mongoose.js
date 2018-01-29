const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://test:test@ds257627.mlab.com:57627/first-blog-mern', { useMongoClient: true });

module.exports = mongoose;
