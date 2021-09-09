const resultValidation = validationResult(req);
//si hay errores en la validación
if(resultValidation.errors.length > 0){
    res.status(200).render("registro", {
        errors: resultValidation.mapped(),
        oldData: req.body
    });
} 
//crear al usuario          
let imagen;
if(req.file){
    console.log(req.file.filename);
    imagen = req.file.filename;
}
else{
    imagen = req.body.img_user = '/img/users/imagen-user-default.png';
}
let usersInfo = {
    ...req.body,
    password: bcrypt.hashSync(req.body.password, 10),
    image: imagen,
};
userModel.create(
    usersInfo
)
res.redirect("/login");
}
crear: async (req, res) => {
    let oldData = req.body;
    let validations = validationResult(req);
    let user = await userModel.findOne({
        where: {
            email: req.body.email
        }
    });
    try {
        if (user) {
            validations.errors.push({
                param: 'email',
                msg: 'El e-mail ya está en uso'
            });
        };
        if (validations.errors.length > 0) {
            res.render('registro', {
                title: 'Crea tu cuenta',
                oldData,
                errors: validations.mapped()
            });
        } else {
            // Creando el usuario
            return db.Usuarios.create({
                first_name: req.body.name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                img_user: req.file.filename,
                type_user_id: "user"
            })
            .then(() => {
                res.redirect('/list');
            })
            .catch(err => {
                res.status(500).render('error', {
                    status: 500,
                    title: 'ERROR',
                    errorDetail: err
                });
            });
        };
    } catch(err) {
        res.status(500).render('error', {
            status: 500,
            title: 'ERROR',
            errorDetail: err
        });
    }    
},


//PRUEBA INICIAL

let imagen;
if (req.file) {
imagen = req.body.img_user;
}
else {
imagen = req.body.img_user = '/img/users/imagen-user-default.png';
}
let userInfo = {
  ...req.body,
    password: bcrypt.hashSync(req.body.password, 11),
    image: imagen,
};
db.Usuarios.create(
userInfo
)
res.redirect("/list", { users: userInfo });
},