module.exports = function(sequelize, dataTypes){

    const alias = "Usuarios"

    const cols = {
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
            type: dataTypes.STRING(300)
        },
        img_user:{
            type: dataTypes.STRING
        },
        type_user_id:{
            type: dataTypes.INTEGER
        }
    }

    const config = {
        tableName:"users",
        timestamps:false
    }

    const Usuarios = sequelize.define(alias, cols, config);

    Usuarios.associate = function(models){
        Usuarios.belongsTo(models.TipoUsuario, {
            as: "tipoUsuario",
            foreignKey: "type_user_id"
        });

        Usuarios.hasMany(models.Pedidos, {
            as: "pedidos",
            foreignKey: "user_id"
        });

        Usuarios.hasMany(models.Carrito, {
            as: "carrito",
            foreignKey: "user_id"
        });
    };

    return Usuarios;
}