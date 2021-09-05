module.exports = function(sequelize, dataTypes){

    const alias = "Categorias"

    const cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name_category:{
            type: dataTypes.STRING
        }
    }

    const config = {
        tableName:"category",
        timestamps:false
    }

    const Categorias = sequelize.define(alias, cols, config);

    Categorias.associate = function(models){
        Categorias.hasMany(models.Productos, {
            as: "productos",
            foreignKey: "category_id"
        })
    };

    return Categorias;
}