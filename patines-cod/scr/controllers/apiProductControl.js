const db = require('../database/models');
const Op = db.Sequelize.Op;

module.exports = {
    list: (req, res) => {
        db.Productos.findAll({ raw: true }).then(function (products) {
            const productsList = []
            for (let i = 0; i < products.length; i++) {
                productsList[i] = {
                    id: products[i].id,
                    name: products[i].name_product,
                    description: products[i].descripcion,
                    detail: '/apiProducts/' + products[i].id
                }
                db.Categorias.findAll({ 
                    raw: true, 
                    where: {
                        id: products[i].id
                }})
                .then(function (categoria){
                    productsList[i]={
                        ...productsList[i],
                        categoria: categoria
                    }
                })
            }
            return res.status(200).json({
                total: products.length,
                data: productsList
            }).catch(console.log())
        })
    },

    detalle: (req, res) => {
        const id = req.params.id

        db.Productos.findByPk(id).then(productDetail => {
            return res.status(200).json({
                name: productDetail.name_product,
                price: productDetail.price,
                img_product: productDetail.img_product
            })
        })
    }

}
