const express = require('express');
const postController = require('./controllers/postController.js');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use('', postController);

app.listen(3000);
