const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/products.json");
const productsList = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const controlador = {
    detail: function (req, res) {
        res.render("productDetail");
    },
    form: function (req, res){
        res.render('productsAdd')
    },
    crear: function (req, res){
        const newProduct = req.body;
        newProduct.size = newProduct.size.split(",");
        newProduct.color = newProduct.color.split(",");
        
        productsList.push({
            id: productsList.length + 1,
            ...newProduct
        });

        fs.writeFileSync(productsFilePath, JSON.stringify(productsList, null, 2));
        res.redirect("/products");
    }

};

module.exports = controlador;