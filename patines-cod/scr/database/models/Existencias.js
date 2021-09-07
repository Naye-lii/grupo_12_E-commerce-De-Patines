module.exports = function(sequelize, dataTypes){

    const alias = "Existencias"

    const cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        product_catalogue_id:{
            type: dataTypes.INTEGER
        },
        size_id:{
            type: dataTypes.INTEGER
        },
        quantity:{
            type: dataTypes.INTEGER
        }
    }

    const config = {
        tableName:"products_stock",
        timestamps:false
    }

    const Existencias = sequelize.define(alias, cols, config);

    Existencias.associate = function(models){
        Existencias.belongsTo(models.Catalogo, {
            as: "catalogo",
            foreignKey: "product_catalogue_id",
            onDelete: 'cascade'
        }),
        Existencias.belongsTo(models.Tallas, {
            as: "tallas",
            foreignKey: "size_id"
        })
    };

    return Existencias;
}