module.exports = (sequelize, dataTypes) => {
    let alias = "Productos";
    let cols = {
id: {
    autoIncrement = true,
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
        as: "Productos",
        foreignKey: "brand_id"
    }),
    Productos.belongsTo(models.Categoria, {
        as: 'Categorias',
        foreignKey: 'category_id'
    });
}
return Productos;
}
