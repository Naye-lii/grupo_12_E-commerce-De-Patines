const express = require('express');
const router = express.Router();

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/img/users')
    },
    filename: function(req, file, cb){
        cb(null, `imgU_${Date.now()}${path.extname(file.originalname)}`)
    }
});

const uploadFile = multer({ storage });

const usersController = require('../controllers/usersController.js');

router.get('/login', usersController.login);
router.get('/register', usersController.register);
router.get('/:id/profile', usersController.profile);
router.post('/:id/profile', usersController.logged);
router.get('/:id/edit', usersController.edit);
router.put('/:id/edit', uploadFile.single('imgUser'), usersController.update);
router.post('/delete/:id',usersController.delete);
router.post('/crear', uploadFile.single('imgUser'), usersController.crear);
router.get('/list', usersController.list);

module.exports = router;