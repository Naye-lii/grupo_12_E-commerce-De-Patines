const express = require('express');
const router = express.Router();

const multer = require('multer');
const path = require('path');
const { body } = require('express-validator');

const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
//const  adminMiddleware = require('../middlewares/adminMiddleware');
const  privateAdminMiddleware = require('../middlewares/privateAdminMiddleware');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img/users')
    },
    filename: function (req, file, cb) {
        cb(null, `imgU_${Date.now()}${path.extname(file.originalname)}`)
    }
});

const uploadFile = multer({ storage });

const usersController = require('../controllers/usersController.js');

const registerValidations = [
    body('first_name')
        .notEmpty().withMessage('Escribe tu nombre').bail()
        .isAlpha().withMessage('El nombre solo debe contener letras').bail()
        .isLength({min:2}).withMessage('El nombre debe contener mínimo 2 caracteres'),
    body('last_name')
        .notEmpty().withMessage('Escribe tu apellido').bail()
        .isAlpha().withMessage('El apellido solo debe contener letras')
        .isLength({min:2}).withMessage('El apellido debe contener mínimo 2 caracteres'),
       body('email')
       .notEmpty().withMessage('Escribe un e-mail').bail()
       .isEmail().withMessage('E-mail inválido'),
    body('password')
        .notEmpty().withMessage('Escribe una contraseña').bail()
        .isLength({min:8}).withMessage('La contraseña debe contener mínimo 8 caracteres'),                                            
    body('img_user').custom((value, { req }) => {
        let file= req.file;
        let acceptedExtensions = ['.jpg', '.png', '.jpeg', '.gif'];

        if(file){
            let fileExtension = path.extname(file.originalname);    
            if(!acceptedExtensions.includes(fileExtension)){
                throw new Error('Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}')
            }
        }
        return true;
    })
];

const editValidations = [
    body('first_name')
        .notEmpty().withMessage('Escribe tu nombre').bail()
        .isAlpha().withMessage('El nombre solo debe contener letras'),
    body('last_name')
        .notEmpty().withMessage('Escribe tu apellido').bail()
        .isAlpha().withMessage('El apellido solo debe contener letras'),
    body('img_user').custom((value, { req }) => {
        let file= req.file;
        let acceptedExtensions = ['.jpg', '.png', '.jpeg'];

        if(file){
            let fileExtension = path.extname(file.originalname);    
            if(!acceptedExtensions.includes(fileExtension)){
                throw new Error('Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}')
            }
        }
        return true;
    })
];


router.get('/register', guestMiddleware, usersController.register);
router.get('/:id/edit', authMiddleware, usersController.edit);
router.put('/:id/edit', authMiddleware, uploadFile.single('img_user'), editValidations, usersController.update);
router.post('/delete/:id', usersController.delete);
router.get('/list',[authMiddleware, privateAdminMiddleware], usersController.list);
router.delete('/:id/delete',authMiddleware, usersController.delete);


//Rutas de login
router.get('/login', guestMiddleware, usersController.login);

//Procesar login
router.post('/login', usersController.loginProcess);

//Perfil de usuario
router.get('/user-profile', authMiddleware, usersController.profile);

//Logout
router.get('/logout/', authMiddleware, usersController.logout);

//Ruta nueva Sequelize
router.get("/crear", usersController.crear);
router.get('/crear', uploadFile.single('img_user'), registerValidations, usersController.crear);
router.post('/crear', uploadFile.single('img_user'), registerValidations, usersController.crear);
router.get('/:id/editar', authMiddleware, usersController.editar);
router.put('/:id/editar', authMiddleware, uploadFile.single('img_user'), editValidations, usersController.actualizar);

module.exports = router;

 //,
        //body('email')
       // .notEmpty().withMessage('Escribe un e-mail').bail()
        //.isEmail().withMessage('E-mail inválido')
        //.custom((value, { req }) => {
         //  userInfo = req.body;
           // let userEmailValidation = userModel.findOne({
             //   where: { email: userInfo.email }
            //});
    
            //if(userEmailValidation){
              //  return res.render('registro', {
                //    errors: { email: { msg: 'El correo ya se encuentra registrado' }}
                //})
            //)