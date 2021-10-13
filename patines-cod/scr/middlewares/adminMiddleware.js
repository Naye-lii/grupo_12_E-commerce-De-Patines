const userModel = require('../database/models').Usuarios;

function adminMiddleware(req, res, next) {
    res.locals.isAdmin = false;
    console.log(req.session.userLogged.type)
    if(req.session.userLogged){
        if(req.session.userLogged.type !== "administrador"){
            res.locals.isAdmin = false;
            console.log(req.session.userLogged.type);
        }else{
            res.locals.isAdmin =true;
            console.log('Es admin');
            console.log(req.session.userLogged.type);
        }
    }
    next();
}

module.exports = adminMiddleware;