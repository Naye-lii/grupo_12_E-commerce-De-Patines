module.exports = function(sequelize, dataTypes){

    const alias = "Colores"

    const cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        color:{
            type: dataTypes.STRING
        }
    }

    const config = {
        tableName:"color",
        timestamps:false
    }

    const Colores = sequelize.define(alias, cols, config);

    Colores.associate = function(models){
        Colores.hasMany(models.Catalogo, {
            as: "catalogo",
            foreignKey: "color_id"
        })
    };

    return Colores;
}