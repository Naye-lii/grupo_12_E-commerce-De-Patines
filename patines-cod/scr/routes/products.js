const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController.js');

router.get('/detail', productsController.detail);
router.get('/create', productsController.form);
router.post('/', productsController.crear)

module.exports = router;