const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const { raw } = require("express");
const { validationResult } = require('express-validator');
const userModel =require('../models/User');

const usersFilePath = path.join(__dirname, "../data/users.json");
var users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

const controlador = {
    register: function(req, res){
        res.cookie('testing', 'Hola mundo', { maxAge: 1000 * 30})
        res.render('registro');
    },
    list: function(req, res){
        res.render("users-list", {users});
    },
    userLoggedProfile: function(req, res){
        res.render('user-profile', {'user': req.user, isAuthenticated: req.user});
    },
    crear: function (req, res){
        const userInfo = req.body;

        userInfo.password = bcrypt.hashSync(userInfo.password, 11);

        if (req.file){
            userInfo.imgUser = '/img/users/' + req.file.filename;
        }else{
            userInfo.imgUser = '/img/users/imagen-user-default.png';
        };

        users.push({
            id: users.length + 1,
            ...userInfo, 
             type: "usuario"
        });

        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
        res.redirect("/user/list");
    },
   /* profile: function(req, res){
        const userId = req.params.id;
        const userD = users.find((user)=>{
            return user.id == userId;
        });
        res.render("user-profile", {user: userD});
    },*/
    edit: function(req, res){
        const userEdit = req.params.id;
        const userInfo = users.find((user)=>{
            return user.id == userEdit;
        });
        res.render("userEdit", {user: userInfo});
    },
    update: function(req, res){
        const userEditId = req.params.id;
        const userAct = req.body;

        const userInfo = users.find((user)=>{
            return user.id == userEditId;
        });

        userInfo.firstName = userAct.firstName;
        userInfo.lastName = userAct.lastName;
  
        if (req.file){
            userAct.imgUser = '/img/users/' + req.file.filename;
        }else{
            userAct.imgUser = userInfo.imgUser;
        };

        userInfo.imgUser = userAct.imgUser;
        
        const userUpdate = users.findIndex((u)=>{
            return u.id == userEditId;
        });
        
        users[userUpdate] = userInfo;

        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
        res.redirect("/user/list");

    },
    delete: function(req, res){
        const userId = req.params.id;

        const userDelete = users.findIndex((u)=>{
            return u.id == userId;
        });

       users.splice(userDelete,1);

       for (let i = 0; i < users.length ;i++){
            users[i].id = i+1;
       };
       
       fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
       res.redirect("/user/list");
    },/*Aquí comienza login*/
    login: function(req, res){
        res.render('login');
    },
    loginProcess: (req, res) => {
        let userToLogin = userModel.findByField('email', req.body.email);
        if(userToLogin){
        let isOkThePassword = bcrypt.compareSync(req.body.password, userToLogin.password);
        if(isOkThePassword){
            delete userToLogin.password;
            req.session.userLogged = userToLogin;

            if(req.body.recordarUsuario) {
                res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 2})
            }

            return res.redirect('user-profile');
        }
        return res.render('login', {errors: {
            email: {
                msg: 'El e-mail no coincide con la contraseña'
            }
        }})
        }
        return res.render('/login', {errors: {
            email: {
                msg: 'E-mail no encontrado'
            }
        }})
    },
    profile: (req, res) => {
        console.log(req.cookies.userEmail);
       return res.render("user-profile", {
           user: req.session.userLogged
       });
    },
    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('home');
    }
};

module.exports = controlador;
