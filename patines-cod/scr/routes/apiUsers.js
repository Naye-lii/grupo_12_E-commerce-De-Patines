const express = require('express');
const router = express.Router();

const apiUsers = require('../controllers/apiUsersControl.js');

router.get("/", apiUsers.list)
router.get("/:id", apiUsers.detalle)

module.exports = router;