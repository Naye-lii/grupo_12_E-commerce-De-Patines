const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController.js');

router.get('/', mainController.index);
router.get('/productCar', mainController.productCar);
router.get('/products', mainController.products);

module.exports = router;