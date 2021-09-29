module.exports = function(sequelize, dataTypes){

    const alias = "Tallas"

    const cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        value_size:{
            type: dataTypes.STRING(5)
        }
    }

    const config = {
        tableName:"sizes",
        timestamps:false
    }

    const Tallas = sequelize.define(alias, cols, config);

    Tallas.associate = function(models){
        Tallas.hasMany(models.Existencias, {
            as: "existencias",
            foreignKey: "size_id"
        })
    };

    return Tallas;
}