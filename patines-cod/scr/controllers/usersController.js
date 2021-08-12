const fs = require("fs");
const path = require("path");

const usersFilePath = path.join(__dirname, "../data/users.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

const controlador = {
    logged: function(req, res){
        const userLogInf = req.body;
        const userLog = users.find((user)=>{
            return user.email == userLogInf.email && user.password == userLogInf.password;
        });

        if (userLog){
            res.render("user-profile", {userLog: userLog}); 
        }else{
            res.send("¡Correo electrónico o contraseña incorrecta¡")
        }        
    },
    crear: function (req, res){
        const userInfo = req.body;
        users.push({
            id: users.length + 1,
            ...userInfo, 
            imgUser: "imagen-user-default.png",
            type: "usuario"
        });

        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
        res.redirect("/products");
    },
    
};

module.exports = controlador;
