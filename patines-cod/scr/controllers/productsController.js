const controlador = {
    detail: function (req, res) {
        res.render("productDetail");
    },
    add: function(req, res){
        res.render('productsAdd')
    }
};

module.exports = controlador;