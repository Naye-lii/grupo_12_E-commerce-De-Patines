const db = require('../database/models');
const Cart = db.Carrito;
const Order = db.Pedido;
const Tallas = db.Tallas;
const Colores = db.Colores;
const Productos = db.Productos;
const Existencias = db.Existencias;

const controlador = {
    detalleOrden: (req, res) =>{
        
        let idProduct = req.params.id;

        Productos.findByPk(idProduct)
        .then((products) => {
            Tallas.findAll({
                where:{
                    id: products.id
                },
                include:[{association:"existencias"}]
            })
            .then((tallas) =>{
                Colores.map((uno) => {
                    Colores.findAll({
                        where:{
                            id: uno.id
                        },
                        include: [{association: "catalogo"}]
                    })
                    .then((colores)=>{
                        res.render("productCart", { products: products, colores: colores, talla: tallas});
                    })
                    .catch(e => console.log(e))
                })                    
            })

        })      

    },
    agregarProducto: (req, res) =>{
        Cart.create ({
        id: req.params.id,
        quantity_items: 1,
        total_price: req.body.price
        }).then((productOrder)=>{
            Order.create({
                id: productOrder.id,
                shopping_cart_id: productOrder.id,
                user_id: 1,
                product_id: productOrder.id
            })
        }
        )}
};

module.exports = controlador;