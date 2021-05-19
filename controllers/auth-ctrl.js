const User = require('../models/user-model');

exports.postRegister = async (req, res, next) => {
    try {
        const user = await User.create({ ...req.body });
        return res.redirect('/auth/login');
    } catch (error) {
        next(error);
    }
}

exports.getRegister = (req, res, next) => {
    return res.render('register-page');
}

exports.getLogin = (req, res, next) => {
    return res.render('login-page')
}

exports.postLogin = (req, res, next) => {
    console.log(req.session);
    // console.log(req.user);
    res.render('home');
}   

exports.logout = async (req, res, next) => {
    console.log("came here")
    req.logout();
    res.redirect('/auth/register');
}
