const express       = require('express');
const router    = require('./controllers/controller.js');

const app = express();

app.use('', router);

app.set('view engine', 'ejs');
app.use(express.static('public'));


app.listen(3000);
