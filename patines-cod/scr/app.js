const express = require('express');
const app = express();
const rutasMain = require('./routes/main.js');
const rutasProducts = require('./routes/products.js');
const rutasUsers = require('./routes/users.js');
const rutasUser = require('./routes/user.js')
const methodOverride = require('method-override');
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');
const session = require('express-session');
const cookies = require('cookie-parser');

app.set('view engine', 'ejs');

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

const port = process.env.PORT || 3000

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

app.use('/', rutasMain);
app.use('/products', rutasProducts);
app.use('/', rutasUsers);
app.use('/user', rutasUser);
app.use((req, res, next) => {
  res.status(404).render('error404');
});
