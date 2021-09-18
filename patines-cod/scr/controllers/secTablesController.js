const db = require("../database/models");
const Marcas = db.Marcas;
const Categorias = db.Categorias;
const Colores = db.Colores;

// CRUD de brands, category, color
// Crear

const controlador = {
    listar: (req, res)=>{
        Marcas.findAll()
        include: [{association: "marcas_id"}]
        .then((marcas =>{
                Categorias.findAll({
                    include: [{association: "productos"}]
                })
                .then((categorias) =>{
                        Colores.findAll({
                            include: [{association: "catalogo"}]
                        })
                .then((colores)=>{
                    res.render("products-list", { marcas: marcas, categorias: categorias, colores: colores });  
                    console.log(products, marcas, catalogo);              
                })
            })
            }))
    },
    // CRUD Marcas
        crearMarca: (req, res) => {
            const newBrand = req.body;
               Marcas.create({
                    id: Marcas.id += 1,
                    name_brand: newBrand.nombre,  
                })
                .then((buscar) => { 
                    Marcas.findOrCreate({
                        where: {
                            name_product: newProduct.nombre
                        }
                        });
                        return buscar
                    })             
                res.redirect("/secProducts");
                },

};

module.exports = controlador;

