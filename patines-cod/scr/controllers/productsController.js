const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/products.json");
const productsList = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
const productsModel =  require('../models/products.model');

const controlador = {
    index: function(req, res){
        try {
        const products = productsModel.list();
        res.status(200).render('products-list', { products });
        console.log(products);
        } catch(err){
            console.log(err)
            return res
            .status(500)
            .render('error', { message: 'Ocurrio un error al listar los productos'})
        }  
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
    destroy: (req, res) => {
        const productIndex = products.findIndex(product => {return product.id === parseInt(req.params.id)});
        products.splice(index, 1);
		fs.writeFileSync(productsFilePath,JSON.stringify(products));
        res.redirect('/products', {products});
    }

};

module.exports = controlador;