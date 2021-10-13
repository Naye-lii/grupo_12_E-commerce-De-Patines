const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Express Validator
const {body} = require('express-validator');


const  authMiddleware = require('../middlewares/authMiddleware');
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


//Express Validator para Editar Producto
const editProductValidations = [
    body('nombre')
        .notEmpty().withMessage('Se debe escribir el nombre del producto').bail()
        .isLength({min:5}).withMessage('El nombre debe contener mínimo 5 caracteres'),
    body('precio')
        .notEmpty().withMessage('Se debe escribir el precio del producto').bail()
        .isNumeric().withMessage('El precio debe ser una cifra numérica'),
    body('descripcion')
        .isLength({min:20}).withMessage('La descripcion debe contener mínimo 20 caracteres'),                                 
    body('imagenP').custom((value, { req }) => {
        let file= req.file;
        let acceptedExtensions = ['.jpg', '.png', '.jpeg', '.gif'];

        if(file){
            let fileExtension = path.extname(file.originalname);    
            if(!acceptedExtensions.includes(fileExtension)){
                throw new Error('Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}')
            }
        }
        return true;
    }),
    body('cantidad')
        .isNumeric().withMessage('Asegurese de solo usar números, si no hay existencias ingrese 0')
];



//Express Validator para Tablas secundarias - CREATE

//Marcas

const brandCreateValidations = [
    body('marca')
    .notEmpty().withMessage('Se debe escribir el nombre de la marca').bail()
    .isLength({min:2}).withMessage('La marca debe contener mínimo 2 caracteres')
];

//Categorías

const categoryCreateValidations = [
    body('categoria')
    .notEmpty().withMessage('Se debe escribir el nombre de la categoría').bail()
    .isLength({min:2}).withMessage('La marca debe contener mínimo 2 caracteres')
];

//Colores

const colorCreateValidations = [
    body('color')
    .notEmpty().withMessage('Se debe escribir el nombre del color').bail()
    .isLength({min:2}).withMessage('La marca debe contener mínimo 2 caracteres')
];

//Express Validator para Tablas secundarias - EDIT 

//Marcas

const brandEditValidations = [
    body('marca')
    .notEmpty().withMessage('Se debe escribir el nombre de la marca').bail()
    .isLength({min:2}).withMessage('La marca debe contener mínimo 2 caracteres')
];

//Categorías

const categoryEditValidations = [
    body('category')
    .notEmpty().withMessage('Se debe escribir el nombre de la categoría').bail()
    .isLength({min:2}).withMessage('La marca debe contener mínimo 2 caracteres')
];

//Colores

const colorEditValidations = [
    body('color')
    .notEmpty().withMessage('Se debe escribir el nombre del color').bail()
    .isLength({min:2}).withMessage('La marca debe contener mínimo 2 caracteres')
];

// Rutas de CRUD de products
router.get('/detail/:id', productsController.detail); 
router.get('/create', [authMiddleware, privateAdminMiddleware], productsController.form);
router.get('/:idProduct/edit', [authMiddleware, privateAdminMiddleware], productsController.formEdit);
router.put('/:idProduct', [authMiddleware, privateAdminMiddleware], productsController.edit);
router.post('/', uploadFile.single('imageP'), editProductValidations, [authMiddleware, privateAdminMiddleware],  productsController.crear);
router.get('/edit/:id', [authMiddleware, privateAdminMiddleware], productsController.edit); 
router.delete('/delete/:id',[authMiddleware, privateAdminMiddleware], productsController.delete);

//Rutas Sequelize
router.get('/list', productsController.listar);
router.get('/search', productsController.search);
router.delete('/borrar/:id',[authMiddleware, privateAdminMiddleware], productsController.borrar);
router.get('/editar/:id',[authMiddleware, privateAdminMiddleware], productsController.formularioEditar)
router.put('/editar/:id',[authMiddleware, privateAdminMiddleware], uploadFile.single('image'), editProductValidations, productsController.actualizar);

// Rutas de CRUD Tablas secundarias
const secProducts = require('../controllers/secTablesController.js');

//listar
router.get('/secProducts',[authMiddleware, privateAdminMiddleware], secProducts.listar);

//crear
    //marcas
router.post('/secProducts/createBrand',[authMiddleware, privateAdminMiddleware], brandCreateValidations, secProducts.guardadoMarca);
    //categorias
router.post('/secProducts/createCategory',[authMiddleware, privateAdminMiddleware], categoryCreateValidations, secProducts.guardadoCategoria);
    //colores
router.post('/secProducts/createColor',[authMiddleware, privateAdminMiddleware], colorCreateValidations, secProducts.guardadoColor);

//editar
    //marcas
router.get('/secProducts/:id/editBrand',[authMiddleware, privateAdminMiddleware], secProducts.editarMarca);
router.post('/secProducts/:id/editBrand',[authMiddleware, privateAdminMiddleware], brandEditValidations, secProducts.actualizarMarca);
    //categorias
router.get('/secProducts/:id/editCategory',[authMiddleware, privateAdminMiddleware], secProducts.editarCategoria);
router.post('/secProducts/:id/editCategory',[authMiddleware, privateAdminMiddleware], categoryEditValidations, secProducts.actualizarCategoria);
    //colores
router.get('/secProducts/:id/editColor',[authMiddleware, privateAdminMiddleware], secProducts.editarColor);
router.post('/secProducts/:id/editColor',[authMiddleware, privateAdminMiddleware], colorEditValidations, secProducts.actualizarColor);

//eliminar
    //marcas
router.delete('/secProducts/deleteBrand/:id',[authMiddleware, privateAdminMiddleware], secProducts.borrarMarca);
    //categorias
router.delete('/secProducts/deleteCategory/:id',[authMiddleware, privateAdminMiddleware], secProducts.borrarCategoria);
    //colores
router.delete('/secProducts/deleteColor/:id',[authMiddleware, privateAdminMiddleware], secProducts.borrarColores);

//CART

//Ver productos en el carrito
router.get('/productCar', cartController.detalleOrden);
//Agregar productos
router.post('/detail/:id', cartController.agregarProducto);

module.exports = router;