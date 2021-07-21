const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

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

router.get('/products/list', productsController.index);
router.get('/detail/:id', productsController.detail); 
router.get('/create', productsController.form);
router.get('/list', productsController.list);
router.get('/:idProduct/edit', productsController.formEdit);
router.put('/:idProduct', productsController.edit);
router.post('/', uploadFile.single('image'),productsController.crear);
router.get('/edit/:id', productsController.edit); 
router.delete('/delete/:id', productsController.delete);
router.post('/products/list', uploadFile.single('image'),productsController.crear);

module.exports = router;