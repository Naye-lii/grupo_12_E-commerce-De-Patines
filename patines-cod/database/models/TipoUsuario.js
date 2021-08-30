module.exports = function(sequelize, dataTypes){

    let alias = "TipoUsuario"

    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        user_type:{
            type: dataTypes.STRING
        }
    }

    let config = {
        tableName:"type_user",
        timestamps:false
    }

    let TipoUsuario = sequelize.define(alias, cols, config);

    TipoUsuario.associate = function(models){
        TipoUsuario.hasMany(models.Usuarios, {
            as: "Usuarios",
            foreignKey: "type_user_id"
        })
    };

    return TipoUsuario;

}