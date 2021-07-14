const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController.js');

router.get('/products', productsController.index);
router.get('/detail', productsController.detail);
router.get('/detail/:id', productsController.detail);
router.get('/create', productsController.form);
router.get('/list', productsController.list);
router.get('/:idProduct/edit', productsController.formEdit)
router.put('/:idProduct', productsController.edit)
router.post('/', productsController.crear)
router.delete('/delete/:id', productsController.destroy);


module.exports = router;