const express       = require('express');
const postController    = require('./controllers/postController.js');

const app = express();

app.use('', postController);

app.set('view engine', 'ejs');
app.use(express.static('public'));


app.listen(3000);
