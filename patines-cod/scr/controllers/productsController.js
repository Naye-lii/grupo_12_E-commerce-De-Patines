const fs = require("fs");
const path = require("path");


const productsFilePath = path.join(__dirname, "../data/products.json");
const productsList = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
const productsModel =  require('../models/products.model');

const controlador = {
    index: function(req, res){
        res.render("/products/list", { products });
    },
    detail: function (req, res) {
        const product = products.find(product => product.id === parseInt(req.params.id));
        res.render('productDetail', {product});
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

    formEdit: function (req, res){
        const idProduct = req.params.idProduct;
        const productEdit = productsList.find((articulo)=>{
            return articulo.id == idProduct;
        });
        res.render("productEdit", {productEdit});
    },
    edit: function (req, res){
        const idProduct = req.params.idProduct;
        const productAct = req.body;
        productAct.size = productAct.size.split(",");
        productAct.color = productAct.color.split(",");

        const productInf = {id: idProduct, ...productAct};

        const productEdit = productsList.findIndex((articulo)=>{
            return articulo.id == idProduct;
        });


        productsList[productEdit] = productInf;

        fs.writeFileSync(productsFilePath, JSON.stringify(productsList, null, 2));
        res.redirect("/products/list");
    },
    delete: (req, res) => {
        const idProduct = req.params.idProduct;
        const productAct = req.body;

        const productInf = {id: idProduct, ...productAct};

        const productDelete = productsList.findIndex((articulo)=>{
            return articulo.id == idProduct;
        });
        productsList.splice(productDelete, 1);

        productsList[productDelete] = productInf;
		fs.writeFileSync(productsFilePath,JSON.stringify(productsList));
        res.redirect("/products/list");
    }

};

module.exports = controlador;