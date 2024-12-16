//const userModel = require('../database/models').Usuarios;

function adminMiddleware(req, res, next) {
    res.locals.isAdmin = false;
    if(req.session.userLogged){
        if(req.session.userLogged.type_user_id !== 2){
            res.locals.isAdmin = false;
            //console.log('No es admin');
            //console.log(req.session.userLogged.type_user_id);
        }else{
            res.locals.isAdmin =true;
            //console.log('Es admin');
            //console.log(req.session.userLogged.type_user_id);
        }
    }
    next();
}

module.exports = adminMiddleware;