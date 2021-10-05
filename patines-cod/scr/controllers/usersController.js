const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const bcryptjs = require("bcryptjs");
const { raw } = require("express");
const { validationResult } = require('express-validator');

// Variable para requerir modelos
const db = require("../database/models");
const userModel = require('../database/models').Usuarios;
const typeUser = require('../database/models').TipoUsuario;

//const usersFilePath = path.join(__dirname, "../data/users.json");
//var users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

const controlador = {
    register: function (req, res) {
        res.cookie('testing', 'Hola mundo', { maxAge: 1000 * 30 })
        res.render('registro');
    },
    crear: function (req, res) {
        const resultValidation = validationResult(req);
        console.log(resultValidation.mapped());
         if (resultValidation.errors.length > 0) {
            return res.render('registro', {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        }
        const userInfo = req.body;

        // TO DO Verificación de email en db
        let userEmailValidation = userModel.findOne({
            where: { email: userInfo.email }
        });

        //if(userEmailValidation){
         //   return res.render('registro', {
           //     errors: { email: { msg: 'El correo ya se encuentra registrado' }}});
        //}

        //Creando usuario          
        let imagen;
        if(userInfo.img_user){
            console.log(userInfo.img_user);
            imagen = userInfo.img_user;
        }
        else{
            imagen = '/img/users/imagen-user-default.png';
        }

        let hashedPass = bcryptjs.hashSync(userInfo.password, 7);
        hashedPass = hashedPass.slice(8, hashedPass.length);
        
        userModel.create( {
            id: userModel.id += 1,
            first_name: userInfo.first_name,
            last_name: userInfo.last_name,
            email: userInfo.email,
            password: hashedPass,
            img_user: imagen,
            type_user_id: 1
        })
        .then((usuario)=>{
            typeUser.create({
                id: usuario.id,
                user_type: 1
            })
        })
        .then(() => {
            res.redirect('/list');
        })
        .catch(err => {
            res.status(500).render('error', {
                status: 500,
                title: 'ERROR',
                message: 'Error al crear usuario'
            });
            console.log(err);});
},
    list: function (req, res) {
        userModel.findAll()
        .then(function(users){
           return res.render("users-list", { users: users});
        })
    },
    userLoggedProfile: function (req, res) {
        res.render('user-profile', { 'user': req.user, isAuthenticated: req.user });
    },
    /* profile: function(req, res){
         const userId = req.params.id;
         const userD = users.find((user)=>{
             return user.id == userId;
         });
         res.render("user-profile", {user: userD});
     },*/
    edit: function (req, res) {
        const userEdit = req.params.id;
        const userInfo = users.find((user) => {
            return user.id == userEdit;
        });
        res.render("userEdit", { user: userInfo });
    },
    update: function (req, res) {

        const resultValidation = validationResult(req);
        console.log(resultValidation.mapped());

        if (resultValidation.errors.length > 0) {
            return res.render('userEdit', {
                errors: resultValidation.mapped(),
                user: req.body
            })
        };

        const userEditId = req.params.id;
        const userAct = req.body;

        const userInfo = users.find((user) => {
            return user.id == userEditId;
        });

        userInfo.first_name = userAct.first_name;
        userInfo.last_name = userAct.last_name;

        if (req.file) {
            userAct.img_user = '/img/users/' + req.file.filename;
        } else {
            userAct.img_user = userInfo.img_user;
        };

        userInfo.img_user = userAct.img_user;

        const userUpdate = users.findIndex((u) => {
            return u.id == userEditId;
        });

        users[userUpdate] = userInfo;

        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
        res.redirect("/user-profile");


    },
    delete: function (req, res) {
        const userId = req.params.id;

        const userDelete = users.findIndex((u) => {
            return u.id == userId;
        });

        users.splice(userDelete, 1);

        for (let i = 0; i < users.length; i++) {
            users[i].id = i + 1;
        };

        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
        res.redirect("/list");
    },/*Aquí comienza login*/
    login: function (req, res) {
        res.render('login');
    },
    loginProcess: (req, res) => {
        userModel.findOne({where:{
            email: req.body.email
            },
            include: [{association: 'tipoUsuario'}]
        })
        .then((userToLogin) => {
            if (userToLogin) {
                let isOkThePassword = bcrypt.compareSync(req.body.password, userToLogin.password);
                if (isOkThePassword) {
                    delete userToLogin.password;
                    req.session.userLogged = userToLogin;
    
                    if (req.body.recordarUsuario) {
                        res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 2 })
                    }
    
                    return res.redirect('user-profile');
                }
                return res.render('login', {
                    errors: {
                        email: {
                            msg: 'El e-mail no coincide con la contraseña'
                        }
                    },oldData : req.body
                })
            } else {
                return res.render('login', {
                    errors: {
                        email: {
                            msg: 'E-mail no encontrado'
                        }
                    },oldData: req.body
                })
            }

        })

    },
    profile: (req, res) => {
        console.log(req.session.userLogged);
        return res.render("user-profile", {
            user: req.session.userLogged
        });
    },
    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    },
    //CRUD para base de datos
    editar:function(req,res){
        db.Usuarios.findByPk(req.params.id)
        .then(function(usuario){
            res.render('userEdit', {user: usuario})
        })
    },

    actualizar: function(req,res){
        console.log(req.body.first_name);
        const id= req.params.id;
        console.log(id);
        db.Usuarios.update({
            first_name: req.body.first_name,
            last_name: req.body.last_name
        },{
            where: {
                id: id
            }
        }
        )

        .then(function(){
            res.redirect('/user-profile')
        })
    }
}
module.exports = controlador;
