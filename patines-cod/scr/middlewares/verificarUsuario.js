const usuarios = require('../data/users.json')

function verificarUsuario(req,res,next){
    let email = req.query.email;
    
    let usuario = usuarios.find(obj => obj.email === email);
    req.user = usuario;
    next();
}

module.exports = verificarUsuario;