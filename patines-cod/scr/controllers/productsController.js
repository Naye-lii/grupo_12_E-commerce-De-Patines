const { DH_CHECK_P_NOT_SAFE_PRIME } = require("constants");
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

const controlador = {
    index: function (req, res) {
        res.render("productsListEdit", { products: productList });
    },
    detail: (req, res) => {
        const idProduct = req.params.id;

        Productos.findByPk(idProduct)
        .then((productB) => {
            Catalogo.findAll({
                where:{
                    product_id: productB.id
                },
                include:[{association:"colores"}]
            })
            .then((catB) =>{
                catB.map((uno) => {
                    Existencias.findAll({
                        where:{
                            product_catalogue_id: uno.id
                        },
                        include: [{association: "tallas"}]
                    })
                    .then( (exist)=>{
                        res.render("productDetail", { product: productB, catlg: catB, exist: exist});
                    })
                    .catch(e => console.log(e))
                })                    
            })

        })      

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
                                    .catch(e => console.log(e))
                            })                            
                    })
            })
    },
    crear: function (req, res) {
        const newProduct = req.body;
        
        if (req.file) {
            newProduct.imagenP = '/img/products/' + req.file.filename;
        } else {
            newProduct.imagenP = '/img/products/No-img.png';
        };

       Productos.create({
            name_product: newProduct.nombre,
            price: newProduct.precio,  
            brand_id: newProduct.marca,
            description: newProduct.descripcion,
            category_id: newProduct.categoria 
        })
        .then((buscar) => { 
            Productos.findOrCreate({
                where: {
                    name_product: newProduct.nombre
                }
                });
                return buscar}) 
            .then((product) => {
                Catalogo.create({
                    product_id: product.id,
                    url_imagen: newProduct.imagenP,
                    color_id: newProduct.color,
                })
                .then((buscarCat) => { 
                    Catalogo.findOrCreate({
                        where: {
                            product_id: product.id,
                            url_imagen: newProduct.imagenP,
                            color_id: newProduct.color,
                        }
                        });
                        return buscarCat})
                        .then((catlg)=>{
                            Existencias.create({
                                product_catalogue_id: catlg.id,
                                size_id: newProduct.talla,
                                quantity: newProduct.cantidad
                            })
                        })                
            })


        res.redirect("/products/list");
    },
    list: function (req, res) {
        res.render("productsListEdit", { products: productsList });
    },
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
    listar: (req, res) => {
        Productos.findAll()
        .then((products) =>{
                Marcas.findAll({
                    include: [{association: "marcas_id"}]
                })
                .then((marcas) =>{
                        Catalogo.findAll({
                            include: [{association: "productos"}]
                        })
                .then((catalogo)=>{
                    res.render("products-list", { products: products, marcas: marcas, catalogo: catalogo,});  
                    console.log(products, marcas, catalogo);              
        })
})
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
    },
    //listar: function (req, res) {
      //  Productos.findAll({
        //    attributes: ['id', 'name_product', 'price', 'brand_id', 'descripcion', 'category_id'],
          //  include: [{association: 'Marcas'}],
            //include: [{association: 'Catalogo'}]
            //})
              //  let products = req.body;
                //console.log(req.body)
                //res.render("products-list", { products: products })
        //}
        listar: function (req, res) {
            //res.render('productsAdd')
            Productos.findAll()
                .then(function (products) {
                    Catalogo.findAll()
                        .then(function (catalogo) {
                            Marcas.findAll()
                                .then(function (marca) {
                           (res.render('products-list', { products: products, catalogo: catalogo, marca: marca})
                                        )                           
                        })
                    })
                })   
            }     
        };           
            
            
        
    module.exports = controlador;