module.exports = function(sequelize, dataTypes){

    let alias = "Carrito"

    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        quantity_items:{
            type: dataTypes.INTEGER
        },
        total_price:{
            type: dataTypes.DOUBLE
        }
    }

    let config = {
        tableName:"shopping_cart",
        timestamps:false
    }

    let Carrito = sequelize.define(alias, cols, config);

    Carrito.associate = function(models){
        Carrito.belongsTo(models.Usuarios, {
            as: "Usuarios",
            foreignKey: "user_id"
        })
    };

    Carrito.associate = function(models){
        Carrito.hasMany(models.DetalleOrden, {
            as: "DetalleOrden",
            foreignKey: "shopping_cart_id"
        })
    };

    return Carrito;

}