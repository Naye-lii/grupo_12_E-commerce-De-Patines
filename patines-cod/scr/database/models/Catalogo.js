module.exports = function(sequelize, dataTypes){

    const alias = "Catalogo"

    const cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        product_id:{
            type: dataTypes.INTEGER
        },
        url_imagen:{
            type: dataTypes.STRING
        },
        color_id:{
            type: dataTypes.INTEGER
        },

    }

    const config = {
        tableName:"products_catalogue",
        timestamps:false
    }

    const Catalogo = sequelize.define(alias, cols, config);

    Catalogo.associate = function(models){
        Catalogo.belongsTo(models.Productos, {
            as: "productos",
            foreignKey: "product_id",
            onDelete: 'cascade'
        }),
        Catalogo.hasMany(models.Existencias, {
            as: "existencias",
            foreignKey: "product_catalogue_id",
            sourceKey:'id',
            onDelete: 'cascade'
        }),
        Catalogo.belongsTo(models.Colores, {
            as: "colores",
            foreignKey: "color_id"
        });
    };

    return Catalogo;
}