const helpers = {};

helpers.pass = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error_msg', 'Por favor, inicia sessión');
    res.redirect('/user/login');
}

module.exports = helpers;