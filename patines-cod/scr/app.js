const express = require('express');
const app = express();

const rutasMain = require('./routes/main.js');
const rutasProducts = require('./routes/products.js');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.set('view engine', 'ejs');
app.use(express.static('./public')); 

const port = process.env.PORT || 3000

app.listen (port, () => {console.log (`App listening at http://localhost:${port}`)});

app.use('/', rutasMain);
app.use('/products', rutasProducts);