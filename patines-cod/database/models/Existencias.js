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
        tableName:"color",
        timestamps:false
    }

    const Existencias = sequelize.define(alias, cols, config);

    Existencias.associate = function(models){
        Existencias.belongsTo(models.Catalogo, {
            as: "catalogo",
            foreignKey: "product_catalogue_id"
        }),
        Existencias.belongsTo(models.Tallas, {
            as: "tallas",
            foreignKey: "size_id"
        })
    };

    return Existencias;
}