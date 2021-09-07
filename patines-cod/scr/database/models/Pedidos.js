module.exports = function(sequelize, dataTypes){

    let alias = "Pedidos"

    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        shopping_cart_id:{
            type: dataTypes.STRING
        },
        user_id:{
            type: dataTypes.INTEGER  
        },
        product_id:{
            type: dataTypes.INTEGER  
        }
    }

    let config = {
        tableName:"order_detail",
        timestamps: false
    }

    let Pedidos = sequelize.define(alias, cols, config);

    Pedidos.associate = function(models){
        Pedidos.belongsTo(models.Carrito, {
            as: "Carrito",
            foreignKey: "shopping_cart_id"
        }),
        Pedidos.belongsTo(models.Carrito, {
            as: "Usuario",
            foreignKey: "user_id"
        }),
        Pedidos.hasMany(models.Productos, {
            as: "Producto",
            foreignKey: "product_id",
            onDelete: 'cascade'
        })
    };

    return Pedidos;

}