const userModel = require('../database/models').Usuarios;

function userLoggedMiddleware(req, res, next){
res.locals.isLogged = false;
console.log("NADA EN LOCALS")

let emailInCookie = req.cookies.userEmail;
userModel.findOne({
    where:{ email: emailInCookie}
})
.then((userFromCookie)=>{
    if(userFromCookie) {
        res.locals.isLogged = true;
        req.session.userLogged = userFromCookie;
    }
})

    if(req.session.userLogged){
    res.locals.isLogged = true; 
    res.locals.userLogged = req.session.userLogged;
    }


next();
}

module.exports = userLoggedMiddleware;