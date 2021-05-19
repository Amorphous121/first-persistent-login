

exports.homePage = (req, res, next) => {
    console.log(req.session);
    res.render('home');
}


exports.profile = (req, res, next) => {
    console.log(req.user)
    res.render('profile');
}