const express = require('express');
const app = express();


app.use(express.static(__dirname + '/public')); 

//app.get ('/', (req, res) => {
  //   res.sendFile("/home.html", {root: "views"})
//});
// aquí estoy llamando el html que modifico, para poder visualizar el suyo cambien el contenido de res.sendFile("/su archivo", {root: "views"})
app.get ('/', (req, res) => {
     res.sendFile("/productDetail.html", {root: "views"})
});
app.get ('/productCar', (req, res) => {
  res.sendFile("/productCar.html", {root: "views"})
});

const port = process.env.PORT || 3000

app.listen (port, () => {console.log (`App listening at http://localhost:${port}`)});