const express = require('express');
const postController = require('./post/controller');
const mongoose = require('mongoose');
require('dotenv').config();
const swaggerJSDoc = require('swagger-jsdoc');
const cors = require('cors');

const app = express();

mongoose.Promise = require('bluebird');

mongoose.connect(`mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@ds257627.mlab.com:57627/first-blog-mern`, { useMongoClient: true });

app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/api', postController);

const options = {
  swaggerDefinition: {
    swagger: '2.0',
    info: {
      description: 'Swagger documentation for first-blog-mern',
      version: '1.0.0', // Version (required)
      title: 'first-blog-mern-server', // Title (required)
      termsOfService: 'http://swagger.io/terms/',
    },
    host: 'localhost:3000',
    basePath: '/api',
    tags: [
      {
        name: 'post',
        description: 'Everything about Posts',
      },
    ],
    schemes: [
      'http',
      'https',
    ],
    consumes: ['application/json'],
    produces: ['applicataion/json'],
  },
  apis: ['./post/controller.js'], // Path to the API docs
};

// Initialize swagger-jsdoc => returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);

app.get('/api/docs', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.listen(3000);

module.exports = app;
