// Buscar a un usuario que se quiere loguear por su email
const { validationResult } = require('express-validator');
const fs = require('fs');

const User = {
    //Buscar todos los usuarios

    getData: function(){
        return JSON.parse(fs.readFileSync(this.filename, 'utf-8'));
    },
    findAll: function(){
    return this.getData();
    },
    findByPk: function(id){
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser.id === id);
    return userFound;
    },
    findByField: function(field, text){
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser[field] === text);
    return userFound;
    },
    processRegister: (req, res) => {
        const resultValidation = validationResult((req));
        let userInDB = User.findByField('email', req.body.email);

        if(userInDB){
            return res.render('register', {
                errors: {
                    email: {
                        msg: 'Este e-mail ya esta registrado'
                    }
                },
                oldData: req.body
            })
        }
 }
};

module.exports = User;