const db = require('../database/models');
const cart = require('../database/models').Carrito;

const controlador = {
    index: async (req, res) => {
        let carts = [];
        let total = 0;

        if(req.session.userLogged){
            carts = await cart.findAll({
                include: [{ association: 'product' }, { association: 'model' }],
                attributes: ['id', [db.Sequelize.fn('SUM', db.Sequelize.literal('quantity')), 'cantidad'], [db.Sequelize.fn('SUM', db.Sequelize.literal('price*quantity')), 'total']],
                where: [{ 'user_id': req.session.userLogged.id }],
                group: ['product_id', 'model_id']
            });
    
            cartTotal = await db.cart.findAll({
                include: [{ association: 'product' }],
                attributes: [[db.Sequelize.fn('SUM', db.Sequelize.literal('price*quantity')), 'total']],
                where: [{ 'user_id': req.session.userLogged.id }],
            });

            total = cartTotal[0].dataValues.total
        }
    },
    addProduct: async (req, res) => {
        let quantity = parseInt(req.body.product_quantity) > 0 ? parseInt(req.body.product_quantity) : 1;
        let model_id = (req.body.model_id) ? req.body.model_id : null;

        // Si ya hay un usuario logueado
        if(req.session.userLogged){
            let cart = await db.cart.findOne({
                where: {
                    user_id: req.session.userLogged.id,
                    product_id: req.body.product_id,
                    model_id: model_id }
            });

            // Si ya tiene ese producto agregado al carrito actualizar su cantidad
            if(cart){
                await db.cart.update({
                    quantity: cart.quantity + quantity
                },{
                    where: { id: cart.id }
                });
            }
            // Si no tiene el producto, anexarlo
            else{
                await db.cart.create({
                    user_id: req.session.userLogged.id,
                    product_id: req.body.product_id,
                    model_id: model_id,
                    quantity: quantity
                });
            }
        }
        else{ // Si es invitado
            let cart = {
                product_id: req.body.product_id,
                model_id: model_id,
                quantity: quantity
            };

            // Si ya tiene un carrito agregado
            if(req.session.tempCart){
                // Si ya tiene ese producto agregado actualiza su cantidad
                let index = req.session.tempCart.findIndex(c => c.product_id == cart.product_id);
                if(index >= 0){
                    req.session.tempCart[index].quantity += cart.quantity;
                }
                // Si no lo tiene agregado lo agrega
                else{
                    req.session.tempCart.push(cart);
                }
            }
            // Si no tiene carrito crea uno nuevo con ese producto
            else{
                req.session.tempCart = [];
                req.session.tempCart.push(cart);
            }
        }

        res.redirect('/cart');
    },

    deleteProduct: async (req, res) => {
        // Si hay un usuario logueado
        if(req.session.userLogged){
            await db.cart.destroy({ where: { id: req.body.cart_id }});
        }
        // Invitado
        else{
            req.session.tempCart.splice(req.body.cart_id, 1);
        }

        res.redirect(req.session.previousPage);
    },

    buyCart: async (req, res) =>{
        // Obtener la fecha actual y transformarla para sql
        let date = new Date();
        let sqlDate = date.toISOString().slice(0, 19).replace('T', ' ');
        
        // Obtener los datos del carrito del usuario
        let carts = await db.cart.findAll({ where: { user_id: req.session.userLogged.id } });
        
        let cartTotal = await db.cart.findAll({
            include: [{ association: 'product' }],
            attributes: [[db.Sequelize.fn('SUM', db.Sequelize.literal('price*quantity')), 'total']],
            where: [{ 'user_id': req.session.userLogged.id }],
        });

        // Crear el recibo
        await db.Check.create({
            user_id: req.session.userLogged.id,
            date: sqlDate,
            total: cartTotal[0].dataValues.total,
        });
        let newCheck = await db.Check.findOne({ where: { date: sqlDate } });

        // Anexar los productos del recibo
        for(let i = 0; i < carts.length; i++){
            await db.Check_Product.create({
                check_id: newCheck.id,
                product_id: carts[i].product_id,
                model_id: carts[i].model_id,
                quantity: carts[i].quantity
            })
        }

        // Borrar el carrito de compras
        await db.cart.destroy({ where: { user_id: req.session.userLogged.id } });

        res.redirect('/');
    }
}

module.exports = controlador;