const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController.js');

router.post('/profile', usersController.logged)
router.post('/crear', usersController.crear);

module.exports = router;