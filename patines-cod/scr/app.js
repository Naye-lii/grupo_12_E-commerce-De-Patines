const express = require('express');
const app = express();
const rutasMain = require('./routes/main.js');
const rutasProducts = require('./routes/products.js');
const rutasUsers = require('./routes/users.js');
const rutasCart = require('./routes/cart.js');
const rutasApiUsers = require('./routes/apiUsers.js');
const rutasApiProducts = require('./routes/apiProducts.js');

const methodOverride = require('method-override');
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');
const adminMiddleware = require('./middlewares/adminMiddleware');
const session = require('express-session');
const cookies = require('cookie-parser');
const cors = require('cors')

app.set('view engine', 'ejs');

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cors())
const port = process.env.PORT || 3001

app.listen(port, () => { console.log(`App listening at http://localhost:${port}`) });

//Session
app.use(session({
  secret: "shhh, it's a secret",
  resave: false,
  saveUninitialized: false,
}));

app.use(cookies());
//UserLoggedMiddleware debe ir después de session !!
app.use(userLoggedMiddleware);
app.use(adminMiddleware);

app.use('/', rutasMain);
app.use('/products', rutasProducts);
app.use('/', rutasUsers);
app.use('/order', rutasCart);

app.use('/apiUsers', rutasApiUsers);
app.use('/apiProducts', rutasApiProducts);

app.use((req, res, next) => {
  res.status(404).render('error404');
});
