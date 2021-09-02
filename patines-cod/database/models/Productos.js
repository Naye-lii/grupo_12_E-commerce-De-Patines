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
let Product = sequelize.define(alias, cols, config);

Product.associate = function(models) {
    Product.belongsTo(models.Marcas, {
        as: "productos",
        foreignKey: "brand_id"
    }),
    Product.belongsTo(models.Categoria, {
        as: 'categorias',
        foreignKey: 'category_id'
    });
}
return Product;
}
