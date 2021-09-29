const express = require('express');
const router = express.Router();

const cartController = require('../controllers/carritoController.js');

router.get("/productCar", cartController.detalleOrden);

module.exports = router;