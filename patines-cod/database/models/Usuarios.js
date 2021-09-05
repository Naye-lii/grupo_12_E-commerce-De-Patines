module.exports = function(sequelize, dataTypes){

    let alias = "Usuarios"

    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        first_name:{
            type: dataTypes.STRING
        },
        last_name:{
            type: dataTypes.STRING
        },
        email:{
            type: dataTypes.STRING
        },
        password:{
            type: dataTypes.STRING
        },
        img_user:{
            type: dataTypes.STRING
        },
        type_user_id:{
            type: dataTypes.INTEGER
        }
    }

    let config = {
        tableName:"users",
        timestamps:false
    }

    let Usuarios = sequelize.define(alias, cols, config);

    Usuarios.associate = function(models){
        Usuarios.belongsTo(models.TipoUsuario, {
            as: "TipoUsuario",
            foreignKey: "type_user_id"
        });

        Usuarios.hasMany(models.Pedidos, {
            as: "Pedidos",
            foreignKey: "user_id"
        });

        Usuarios.hasMany(models.Carrito, {
            as: "Carrito",
            foreignKey: "user_id"
        });
    };

    return Usuarios;
}