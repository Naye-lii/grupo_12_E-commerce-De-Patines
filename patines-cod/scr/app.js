const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.use(express.static('../public')); 

const port = process.env.PORT || 3000

app.listen (port, () => {console.log (`App listening at http://localhost:${port}`)});

//app.get ('/', (req, res) => {
  //   res.sendFile("/productDetail.html", {root: "views"})
//});
// aquí estoy llamando el html que modifico, para poder visualizar el suyo cambien el contenido de res.sendFile("/su archivo", {root: "views"})
app.get ('/', (req, res) => {
     res.render('home')
});

app.get ('/login', (req, res) => {
  res.render("login")
});

app.get ('/registro', (req, res) => {
  res.render("registro")
});

app.get ('/Details', (req, res) => {
  res.render("productDetail")
});

app.get ('/productCar', (req, res) => {
  res.render("productCar")
});

app.get ('/products-list', (req, res) => {
  res.render("products-list")
});
