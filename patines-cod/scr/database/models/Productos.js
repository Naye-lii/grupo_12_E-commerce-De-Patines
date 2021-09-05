module.exports = (sequelize, dataTypes) => {
    let alias = "Productos";
    let cols = {
        id: {
            autoIncrement:true,
            primaryKey: true,
            type: dataTypes.INTEGER   
        },
        name_product: {
            type: dataTypes.STRING(50) 
        },
        price: {
            type: dataTypes.DOUBLE
        },  
        brand_id: {
            type: dataTypes.INTEGER  
        },
        description: {
            type: dataTypes.STRING  
        },
        category_id: {
            type: dataTypes.INTEGER  
        }
    }
let config = {
    tableName: "products",
    timestamps:false
};
let Productos = sequelize.define(alias, cols, config);

Productos.associate = function(models) {
    Productos.belongsTo(models.Marcas, {
        as: "marcas",
        foreignKey: "brand_id"
    }),
    Productos.belongsTo(models.Categorias, {
        as: 'categorias',
        foreignKey: 'category_id'
    }),
    Productos.hasMany(models.Catalogo, {
        as: "catalogo",
        foreignKey: "product_id"
    });
}
return Productos;
}
