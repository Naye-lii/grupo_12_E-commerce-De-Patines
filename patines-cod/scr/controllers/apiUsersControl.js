const db = require('../database/models');
const Op =  db.Sequelize.Op;

module.exports = {
    list: (req, res) => {
        db.Usuarios.findAll({raw:true}).then(users => {
            const usersList=[] 
            for (let i=0; i < users.length; i++){
                    usersList[i] = {
                        id: users[i].id,
                        name: users[i].first_name + " " + users[i].last_name,
                        email: users[i].email,
                        detail: '/apiUsers/' + users[i].id
                    }  
                }

            return res.status(200).json({
                total: users.length,
                data: usersList             
            })
        }).catch(console.log())
    },
    detalle: (req, res) => {
        const id = req.params.id

        db.Usuarios.findByPk(id).then(userDetail => {
            return res.status(200).json({
                name: userDetail.first_name + " " + userDetail.last_name,
                email: userDetail.email,
                img_user: userDetail.img_user            
            })
        })
    }

}
