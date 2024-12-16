const db = require("./scr/database/models")

module.exports = {
    list: (req, res) => {
        db.Usuarios
        .findAll()
        .then(users => {
            return res.json({
                count: users.length,
                users: users.id,
                name: users.name,
                email: users.email,
                detail: users.id
            })
        })
    },
    store: (req, res) => {
        db.Usuarios
        .destroy(req.params.id)
    }
}