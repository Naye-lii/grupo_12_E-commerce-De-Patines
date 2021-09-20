const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const  authMiddleware = require('../middlewares/authMiddleware');
const  adminMiddleware = require('../middlewares/adminMiddleware');
const  privateAdminMiddleware = require('../middlewares/privateAdminMiddleware');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/img/products')
    },
    filename: function(req, file, cb){
        cb(null, `imgP_${Date.now()}${path.extname(file.originalname)}`)
    }
});

const uploadFile = multer({ storage });

const productsController = require('../controllers/productsController.js');
const cartController = require('../controllers/carritoController.js');

router.get('/products/list', productsController.index);
router.get('/detail/:id', productsController.detail); 
router.get('/create', /*[authMiddleware, adminMiddleware, privateAdminMiddleware],*/ productsController.form);
router.get('/:idProduct/edit', /*[authMiddleware, adminMiddleware, privateAdminMiddleware],*/ productsController.formEdit);
router.put('/:idProduct', /*[authMiddleware, adminMiddleware, privateAdminMiddleware],*/ productsController.edit);
router.post('/', uploadFile.single('image'),/*[authMiddleware, adminMiddleware, privateAdminMiddleware],*/ productsController.crear);
router.get('/edit/:id', /*[authMiddleware, adminMiddleware, privateAdminMiddleware],*/ productsController.edit); 
router.delete('/delete/:id',/*[authMiddleware, adminMiddleware, privateAdminMiddleware],*/ productsController.delete);
router.post('/products/list', uploadFile.single('image'), /*[authMiddleware, adminMiddleware, privateAdminMiddleware],*/ productsController.crear);


//Rutas Sequelize
router.get('/products-list', productsController.listar);
router.get('/search', productsController.search);
router.delete('/borrar/:id', productsController.borrar);

// Rutas de CRUD Tablas secundarias
const secProducts = require('../controllers/secTablesController.js');

//listar
router.get('/secProducts', secProducts.listar);

//crear
    //marcas
router.post('/secProducts/createBrand', secProducts.guardadoMarca);
    //categorias
router.post('/secProducts/createCategory', secProducts.guardadoCategoria);
    //colores
router.post('/secProducts/createColor', secProducts.guardadoColor);

//editar
    //marcas
router.get('/secProducts/:id/editBrand', secProducts.editarMarca);
router.post('/secProducts/:id/editBrand', secProducts.actualizarMarca);
    //categorias
router.get('/secProducts/:id/editCategory', secProducts.editarCategoria);
router.post('/secProducts/:id/editCategory', secProducts.actualizarCategoria);
    //colores
router.get('/secProducts/:id/editColor', secProducts.editarColor);
router.post('/secProducts/:id/editColor', secProducts.actualizarColor);

//eliminar
    //marcas
router.delete('/secProducts/deleteBrand/:id', secProducts.borrarMarca);
    //categorias
router.delete('/secProducts/deleteCategory/:id', secProducts.borrarCategoria);
    //colores
router.delete('/secProducts/deleteColor/:id', secProducts.borrarColores);

//CART

//Ver productos en el carrito
router.get('/productCar', cartController.detalleOrden);
//Agregar productos
router.post('/detail/:id', cartController.agregarProducto);

module.exports = router;