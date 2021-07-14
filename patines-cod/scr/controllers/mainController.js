
const controlador = {
    index: function(req, res){
        res.render("home");
    },
    login: function(req, res){
        res.render("login");
    },
    registro: function(req, res){
        res.render("registro");
    },
    productCar: function(req, res){
        res.render("productCar")
    },
    products: function (req, res){
        res.render("products-list");
    },
};

module.exports = controlador;