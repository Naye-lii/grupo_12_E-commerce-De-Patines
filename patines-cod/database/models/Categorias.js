module.exports = function(sequelize, dataTypes){

    let alias = "Categorias"

    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name_category:{
            type: dataTypes.STRING
        }
    }

    let config = {
        tableName:"category",
        timestamps:false
    }

    let Categorias = sequelize.define(alias, cols, config);

    Categorias.associate = function(models){
        Categorias.hasMany(models.Productos, {
            as: "Productos",
            foreignKey: "category_id"
        })
    };

    return Usuarios;
}