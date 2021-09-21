module.exports = (sequelize, dataTypes) => {
    const alias = "Productos";
    const cols = {
        id: {
            autoIncrement:true,
            primaryKey: true,
            type: dataTypes.INTEGER   
        },
        name_product: {
            type: dataTypes.STRING 
        },
        price: {
            type: dataTypes.DOUBLE
        },  
        brand_id: {
            type: dataTypes.INTEGER  
        },
        descripcion: {
            type: dataTypes.STRING  
        },
        category_id: {
            type: dataTypes.INTEGER  
        }
    }
    const config = {
        tableName: "products",
        timestamps:false
    };
    const Productos = sequelize.define(alias, cols, config);

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
            foreignKey: "product_id",
            sourceKey:'id',
            onDelete: 'cascade'
        });
    }

    return Productos;
}