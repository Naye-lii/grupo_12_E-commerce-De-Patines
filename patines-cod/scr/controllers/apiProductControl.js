const db = require('../database/models');
const Op = db.Sequelize.Op;

module.exports = {
    list: (req, res) => {
        db.Productos.findAll({ 
            include: [{ association: "categorias" }]
        }).then(function (products) {
            const productsList = []
            for (let i = 0; i < products.length; i++) {
                productsList[i] = {
                    id: products[i].id,
                    name: products[i].name_product,
                    description: products[i].descripcion,
                    category: products[i].categorias.name_category,
                    detail: '/apiProducts/' + products[i].id,
                    
                }
            }
            db.Productos.findAll({
                where:{
                    category_id: 1, 
                }
            }).then( (patines) => {
                db.Productos.findAll({
                    where:{
                        category_id: 2, 
                    }
                }).then( (proteccion) => {
                    db.Productos.findAll({
                        where:{
                            category_id: 3, 
                        }
                    }).then((accesorios) => {
                        db.Productos.findAll({
                            where:{
                                category_id: 4, 
                            }
                    }).then((refacciones) => {
                        return res.status(200).json({
                            total: products.length,
                            countByCategory: [
                                {
                                    name: "Patines",
                                    cantidad: patines.length,
                                },
                                {
                                    name: "proteccion",
                                    cantidad: proteccion.length,
                                },
                                {
                                    name: "accesorios",
                                    cantidad: accesorios.length,
                                },
                                {
                                    name: "refacciones",
                                    cantidad: refacciones.length
                                }
                            ],
                            data: productsList
                        })
                    }).catch(console.log())
                    })
                })
                
            })
        })
    },

    detalle: (req, res) => {
        const idProduct = req.params.id;

        db.Productos.findByPk(idProduct)
            .then((productB) => {
                db.Catalogo.findAll({
                    where: {
                        product_id: productB.id
                    },
                    include: [{ association: "colores" }]
                })
                    .then((catB) => {
                        catB.map((uno) => {
                            db.Existencias.findAll({
                                where: {
                                    product_catalogue_id: uno.id
                                },
                                include: [{ association: "tallas" }]
                            })
                                .then((exist) => {
                                    db.Marcas.findByPk(productB.brand_id).then((marca)=>{
                                        const color = [];
                                        const imagen = [];
                                        const tallas = [];
                                        for (let i = 0; i < catB.length; i++){
                                            color[i]=catB[i].colores.color;
                                            imagen[i]=catB[i].url_imagen;
                                        }
                                        for (let i = 0; i < exist.length; i++){
                                            tallas[i]={
                                                talla: exist[i].tallas.value_size,
                                                existencia: exist[i].quantity
                                            };
                                        }
                                    


                                        return res.status(200).json({
                                            name: productB.name_product,
                                            price: productB.price,
                                            marca: marca.name_brand,
                                            descripcion: productB.descripcion,
                                            categoria: catB.name_category,
                                            color:color,
                                            talla:tallas,
                                            img_product: imagen
                                        })
                                    }).catch(e => console.log(e))
                                    
                                })
                                
                        })
                    })

            })

       /* const id = req.params.id

        db.Productos.findByPk(id).then(productDetail => {
            return res.status(200).json({
                name: productDetail.name_product,
                price: productDetail.price,
                img_product: productDetail.img_product
            })
        })*/
    }

}
