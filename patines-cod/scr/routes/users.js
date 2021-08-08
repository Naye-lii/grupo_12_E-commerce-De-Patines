const express = require('express');
const router = express.Router();

const multer = require('multer');
const path = require('path');
const { body } = require('express-validator');

const  guestMiddleware = require('../middlewares/guestMiddleware');
const  authMiddleware = require('../middlewares/authMiddleware');

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

router.get('/register',  guestMiddleware, usersController.register);
router.get('/:id/edit', usersController.edit);
router.put('/:id/edit', uploadFile.single('imgUser'), usersController.update);
router.post('/delete/:id',usersController.delete);
router.post('/crear', uploadFile.single('imgUser'), usersController.crear);
router.get('/list', usersController.list);
router.delete('/:id/delete', usersController.delete);


//Rutas de login
router.get('/login', guestMiddleware, usersController.login);

//Procesar login
router.post('/login', usersController.loginProcess);

//Perfil de usuario
router.get('/user-profile', authMiddleware, usersController.profile);

//Logout
router.get('/logout/', usersController.logout);
  
module.exports = router;