const express = require('express');
const app = express();
const rutasMain = require('./routes/main.js');
const rutasProducts = require('./routes/products.js');
const rutasUsers = require('./routes/users.js');
const methodOverride =  require('method-override');

app.set('view engine', 'ejs');

app.use(express.static('./public')); 
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride('_method'));

const port = process.env.PORT || 3000

app.listen (port, () => {console.log (`App listening at http://localhost:${port}`)});

app.use('/', rutasMain);
app.use('/products', rutasProducts);
app.use('/user', rutasUsers);