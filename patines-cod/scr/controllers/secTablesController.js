const { response } = require("express");
const db = require("../database/models");
const Marcas = db.Marcas;
const Categorias = db.Categorias;
const Colores = db.Colores;
const Productos = db.Productos;

// Express validator
const { validationResult } = require('express-validator');

// CRUD de brands, category, color

const controlador = {
    listar: (req, res) => {
            Marcas.findAll()
        .then((marcas) =>{
                Categorias.findAll({
                    include: [{association: "productos"}]
                })
                .then((categorias) =>{
                        Colores.findAll({
                            include: [{association: "catalogo"}]
                        })
                .then((color)=>{
                    res.render("secProducts", { marcas: marcas, categorias: categorias, color: color});                
        })
})
})
},
    // CRUD Marcas
        guardadoMarca: (req, res) => {
            let resultadoValidacion = validationResult(req);
            if (resultadoValidacion.errors.length  < 0){
               Marcas.create({
                    id: req.body.id,
                    name_brand: req.body.marca
                })
                .then((buscar) => { 
                    Marcas.findOrCreate({
                        where: {
                            name_brand: req.body.marca
                        }
                        })
                        .then(() => {
                            res.redirect('/products/secProducts');
                        })
                        .catch(err => {
                            res.status(500).render('error', {
                                status: 500,
                                title: 'ERROR',
                                message: 'Error al crear marca'
                            });
                            console.log(err);
                        })
                  })
                }
                else {
                    res.render('secTables', { errores: resultadoValidacion.errors})
                }
                    },
                    borrarMarca: function (req, res) {
                        const idMarca = req.params.id;
                    
                        Marcas.destroy({
                            where: {
                                id: idMarca
                            }
                        }).then(function () {
                            Marcas.findAll({
                                where: {
                                    id: idMarca
                                },
                            })
                            .then(function (marcas) {
                                for (let i = 0; i < marcas.length; i++) {
                                    Marcas.destroy({
                                        where: {
                                            id: marcas[i].id
                                        }
                                    })
                                }
                            })
                        }).then(function () {
                            Marcas.destroy({
                                where: {
                                    id: idMarca
                                }
                            })
                        })
                            .then(function () {
                                res.redirect('/products/secProducts')
                            })
                    },
                    editarMarca: (req, res) => {
                        let errores = validationResult(req);
                            const idMarca = req.params.id;
                            Marcas.findByPk(idMarca)
                            .then((marcaB) => 
                            {
                                Marcas.findAll({
                                    where: {
                                      id: marcaB.id
                                       }
                            })
                                console.log(idMarca, marcaB)
                                res.render('brandEdit', {brand: marcaB, id: idMarca, errores: errores.array()})
                        })
                            },
                    actualizarMarca: (req, res) => {
                        let errores = validationResult(req);

                        if(errores.isEmpty()) {
                        Marcas.update({
                            id: req.params.id,
                            name_brand: req.body.marca
                        }, {
                            where: {
                                id: req.params.id
                        }})
                                .then(() => {
                                    res.redirect('/products/secProducts');
                                })
                                .catch(err => {
                                    res.status(500).render('error', {
                                        status: 500,
                                        title: 'ERROR',
                                        message: 'Error al crear marca'
                                    });
                                    console.log(err);
                                })
                            }
                    else {
                        res.render ('brandEdit', { errores: errores.array(), old: req.body, brand: req.body.marca });
                        }
                    },
             // CRUD Categorías
             guardadoCategoria: (req, res) => {
                Categorias.create({
                     id: req.body.id,
                     name_category: req.body.categoria
                 })
                 .then((buscar) => { 
                     Categorias.findOrCreate({
                         where: {
                             name_category: req.body.categoria
                         }
                         })
                         .then(() => {
                             res.redirect('/products/secProducts');
                         })
                         .catch(err => {
                             res.status(500).render('error', {
                                 status: 500,
                                 title: 'ERROR',
                                 message: 'Error al crear marca'
                             });
                             console.log(err);
                         })
                   })
                    },
                    borrarCategoria: function (req, res) {
                        const idCategoria = req.params.id;
                
                        Categorias.destroy({
                            where: {
                                id: idCategoria
                            }
                        }).then(function () {
                            Categorias.findAll({
                                where: {
                                    id: idCategoria
                                }
                            })
                            .then(function (categoria) {
                                for (let i = 0; i < color.length; i++) {
                                   Categorias.destroy({
                                        where: {
                                            id: categoria[i].id
                                        }
                                    })
                                }
                            })
                        }).then(function () {
                            Categorias.destroy({
                                where: {
                                    id: idCategoria
                                }
                            })
                        })
                            .then(function () {
                                res.redirect('/products/secProducts')
                            })
                        },
                        editarCategoria: (req, res) => {
                            let resultadoValidacion = validationResult(req);
                            const idCategoria = req.params.id;
                            Categorias.findByPk(idCategoria)
                            .then((categoriaB) => 
                            {
                               Categorias.findAll({
                                    where: {
                                      id: categoriaB.id
                                       }
                            })
                                console.log(idCategoria, categoriaB)
                                res.render('categoryEdit', {category: categoriaB, id: idCategoria, errores: resultadoValidacion.errors})   
                            })
                    },
                    actualizarCategoria: (req, res) => {
                        Categorias.update({
                            id: req.params.id,
                            name_category: req.body.category
                        }, {
                            where: {
                                id: req.params.id
                        }})
                                .then(() => {
                                    res.redirect('/products/secProducts');
                                })
                                .catch(err => {
                                    res.status(500).render('error', {
                                        status: 500,
                                        title: 'ERROR',
                                        message: 'Error al crear marca'
                                    });
                                    console.log(err);
                                })
                    },
                    // CRUD Colores
                    guardadoColor: (req, res) => {
                        idColor = req.body.id
                        Colores.create({
                             id: req.body.id,
                             color: req.body.color
                         })
                         .then((buscar) => { 
                             Colores.findOrCreate({
                                 where: {
                                     color: req.body.color
                                 }
                                 })
                                 .then(() => {
                                     res.redirect('/products/secProducts');
                                 })
                                 .catch(err => {
                                     res.status(500).render('error', {
                                         status: 500,
                                         title: 'ERROR',
                                         message: 'Error al crear marca'
                                     });
                                     console.log(err);
                                 })
                           })
                        },
                    borrarColores: function (req, res) {
                        const idColores = req.params.id;
                
                        Colores.destroy({
                            where: {
                                id: idColores
                            }
                        }).then(function () {
                            Colores.findAll({
                                where: {
                                    id: idColores
                                }
                            })
                            .then(function (color) {
                                for (let i = 0; i < color.length; i++) {
                                   Colores.destroy({
                                        where: {
                                            id: color[i].id
                                        }
                                    })
                                }
                            })
                        }).then(function () {
                            Colores.destroy({
                                where: {
                                    id: idColores
                                }
                            })
                        })
                            .then(function () {
                                res.redirect('/products/secProducts')
                            })
                        },
                        editarColor: (req, res) => {
                            let resultadoValidacion = validationResult(req);
                            const idColor = req.params.id;
                            Colores.findByPk(idColor)
                            .then((colorB) => 
                            {
                               Colores.findAll({
                                    where: {
                                      id: colorB.id
                                       }
                            })
                                console.log(idColor, colorB)
                                res.render('colorEdit', {color: colorB, id: idColor, errores: resultadoValidacion.errors})   
                            })
                    },
                    actualizarColor: (req, res) => {
                        Colores.update({
                            id: req.params.id,
                            color: req.body.color
                        }, {
                            where: {
                                id: req.params.id
                        }})
                                .then(() => {
                                    res.redirect('/products/secProducts');
                                })
                                .catch(err => {
                                    res.status(500).render('error', {
                                        status: 500,
                                        title: 'ERROR',
                                        message: 'Error al crear marca'
                                    });
                                    console.log(err);
                                })
                            }

            };

module.exports = controlador;

