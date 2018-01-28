const express       = require('express');
const controller    = require('./controllers/controller.js');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

controller(app);

app.listen(3000);
