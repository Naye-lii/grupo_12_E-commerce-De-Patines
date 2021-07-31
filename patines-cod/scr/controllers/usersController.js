const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

const usersFilePath = path.join(__dirname, "../data/users.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

const controlador = {
    login: function(req, res){
        res.render('login');
    },
    register: function(req, res){
        res.render('registro');
    },
    list: function(req, res){
        res.render("users-list", {users});
    },
    logged: function(req, res){
        const userLogInf = req.body;
        const userLog = users.find((user)=>{
            return user.email == userLogInf.email && user.password == userLogInf.password;
        });

        if (userLog){
            res.render("user-profile", {user: userLog}); 
        }else{
            res.send("¡Correo electrónico o contraseña incorrecta¡")
        }        
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
    profile: function(req, res){
        const userId = req.params.id;
        const userD = users.find((user)=>{
            return user.id == userId;
        });
        res.render("user-profile", {user: userD});

    },
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
    }
    
};

module.exports = controlador;
