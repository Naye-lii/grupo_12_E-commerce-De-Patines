const fs = require("fs");
const path = require("path");
const { nextTick } = require("process");

// Variable para requerir modelos
let db = require("../database/models");
const Op = db.Sequelize.Op;
const Productos = db.Productos;
const Marcas = db.Marcas;
const Categorias = db.Categorias;
const Colores = db.Colores;
const Tallas = db.Tallas;
const Catalogo = db.Catalogo;
const Existencias = db.Existencias;


const productsFilePath = path.join(__dirname, "../data/products.json");
const productsList = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
const productsModel = require('../models/products.model');

const controlador = {
    index: function (req, res) {
        res.render("productsListEdit", { products: productList });
    },
    detail: (req, res) => {
        const idProduct = req.params.id;
        const productSize = req.params.size;
        const product = productsList.find((articulo) => {
            return articulo.id == idProduct;
        });
        res.render("productDetail", { products: productsList, product, idProduct, productSize });


    },
    form: function (req, res) {
        //res.render('productsAdd')
        Marcas.findAll()
            .then(function (marca) {
                Categorias.findAll()
                    .then(function (categoria) {
                        Colores.findAll()
                            .then(function (color) {
                                Tallas.findAll()
                                    .then(function (talla) {
                                        return res.render('productsAdd', { marca: marca, categoria: categoria, color: color, talla: talla})
                                    })
                            })                            
                    })
            })
    },
    crear: function (req, res) {
        const newProduct = req.body;
        /*if (req.file) {
            newProduct.img = '/img/products/' + req.file.filename;
        } else {
            newProduct.img = '/img/products/No-img.png';
        };*/

        Productos.create({
            name_product: newProduct.nombre,
            price: newProduct.precio,  
            brand_id: newProduct.marca,
            description: newProduct.descripcion,
            category_id: newProduct.categoria 
        });

        Productos.findAll().then(function (result) {
            console.log(result)
        })

        /*Catalogo.create({
            product_id: Productos.findOne({
                where:{
                    name_product: newProduct.nombre 
                }
            }).then(function (resultado) {
                return resultado.id
            }),
            url_imagen: '/img/products/No-img.png',
            color_id: newProduct.color
        })
            
            /*Catalogo.findOne({
                where:{
                    product_id: produ.id,
                    url_imagen: '/img/products/No-img.png',
                }
            })
            .then((catal)=>{
                Existencias.create({
                    product_catalogue_id: catal.id,
                    size_id: newProduct.talla,
                    quantity: newProduct.cantidad
                })
            })
        })
        ;

        /*newProduct.size = newProduct.size.split(",");
        newProduct.color = newProduct.color.split(",");*/
     
        /*productsList.push({
            id: productsList.length + 1,
            ...newProduct
        });

        fs.writeFileSync(productsFilePath, JSON.stringify(productsList, null, 2));
        */res.redirect("/products/list");
    },
    //list: function (req, res) {
        //res.render("productsListEdit", { products: productsList });
    //},
    formEdit: function (req, res) {
        const idProduct = req.params.idProduct;
        const productEdit = productsList.find((articulo) => {
            return articulo.id == idProduct;
        });
        res.render("productEdit", { productEdit });
    },
    edit: function (req, res) {
        const idProduct = req.params.idProduct;
        const productAct = req.body;
        productAct.size = productAct.size.split(",");
        productAct.color = productAct.color.split(",");
        if (req.file) {
            productAct.image = '/img/products/' + req.file.filename;
        } else {
            productAct.image = '/img/products/' + productAct.image;
        };


        const productInf = { id: idProduct, ...productAct };

        const productEdit = productsList.findIndex((articulo) => {
            return articulo.id == idProduct;
        });

        productsList[productEdit] = productInf;

        fs.writeFileSync(productsFilePath, JSON.stringify(productsList, null, 2));
        res.redirect("/products/list");
    },
    delete: (req, res) => {
        const idProduct = req.params.idProduct;
        const productAct = req.body;

        const productInf = { id: idProduct, ...productAct };

        const productDelete = productsList.findIndex((articulo) => {
            return articulo.id == idProduct;
        });
        productsList.splice(productDelete, 1);

        productsList[productDelete] = productInf;
        fs.writeFileSync(productsFilePath, JSON.stringify(productsList));
        res.redirect("/products/list");
        return location.reload();
    },
    //CRUD para base de datos
    listar: function (req, res) {
        db.Productos.findAll(
            {
                attributes: ['id', 'name_product', 'price', 'brand_id', 'descripcion', 'category_id']
            }
            ,
            {
               include: [{association: 'marcas'}]
            }
        )
            .then(function (productos) {
                console.log(productos);
                res.render("products-list", { products: productos })
            })
        .catch(function(e){
            console.log(e.toString());
        })
    },

    search: function (req, res) {
        console.log('buscando');
        console.log(req.query.busqueda);
        db.Productos.findAll({
            where: {
                name_product: {
                    [Op.like]: '%' + req.query.busqueda + '%'
                }
            },
            attributes: ['id', 'name_product', 'price', 'brand_id', 'descripcion', 'category_id']
        })
            .then(function (productos) {
                res.render("products-list", { products: productos })
            })
    },

    borrar: function (req, res) {
        const idProducto = req.params.id;

        db.Pedidos.destroy({
            where: {
                product_id: idProducto
            }
        }).then(function () {
            db.Catalogo.findAll({
                where: {
                    product_id: idProducto
                }
            })
            .then(function (productos) {
                for (let i = 0; i < productos.length; i++) {
                    db.Existencias.destroy({
                        where: {
                            product_catalogue_id: productos[i].id
                        }
                    })
                }
            })
        }).then(function () {
            db.Catalogo.destroy({
                where: {
                    product_id: idProducto
                }
            })
        }).then(function () {
            db.Productos.destroy({
                where: {
                    id: idProducto
                }
            })
        })
            .then(function () {
                res.redirect('/products/products-list')
            })
    }
};

    module.exports = controlador;