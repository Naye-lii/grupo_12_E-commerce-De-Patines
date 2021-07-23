const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController.js');

router.get('/:id/profile', usersController.profile);
router.post('/:id/profile', usersController.logged);
router.get('/:id/edit', usersController.edit);
router.post('/delete/:id', usersController.delete);
router.post('/crear', usersController.crear);
router.get('/list', usersController.list);

module.exports = router;