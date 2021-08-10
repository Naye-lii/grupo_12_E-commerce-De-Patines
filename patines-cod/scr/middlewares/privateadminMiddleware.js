function privateAdminMiddleware(req, res, next) {

    if (!res.locals.isAdmin) {
        return res.redirect('/products/list');
    }
    next();
}

module.exports = privateAdminMiddleware;