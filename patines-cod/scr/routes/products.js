const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController.js');

router.get('/detail', productsController.detail);
router.get('/add', productsController.add);

module.exports = router;