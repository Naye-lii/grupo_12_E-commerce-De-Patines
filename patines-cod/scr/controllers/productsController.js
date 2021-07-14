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
    },
    list: function (req, res){
        res.render("productsListEdit", {products: productsList});
    },

    edit: function (req, res){
        const idProduct = req.params.idProduct;
        const productEdit = productsList.find((articulo)=>{
            return articulo.id == idProduct;
        });
        console.log(productEdit);
        res.render("productEdit", {productEdit});
    }

};

module.exports = controlador;