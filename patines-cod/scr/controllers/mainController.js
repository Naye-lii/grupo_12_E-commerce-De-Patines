
const controlador = {
    index: function(req, res){
        res.render("home");
    },
    productCar: function(req, res){
        res.render("productCar")
    },
    products: function (req, res){
        res.render("products-list");
    },
};

module.exports = controlador;