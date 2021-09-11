module.exports = function(sequelize, dataTypes){

    let alias = "Marcas"

    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        }
    }

    let config = {
        tableName:"brands",
        timestamps:false
    }

    let Marcas = sequelize.define(alias, cols, config);

    Marcas.associate = function(models){
        Marcas.hasMany(models.Productos, {
            as: "marcas",
            foreignKey: "brand_id"
        })
    };

    return Marcas;

}