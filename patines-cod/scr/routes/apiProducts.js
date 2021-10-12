const express = require('express');
const router = express.Router();

const apiProducts = require('../controllers/apiProductControl.js');

router.get("/", apiProducts.list)
router.get("/:id", apiProducts.detalle)

module.exports = router;