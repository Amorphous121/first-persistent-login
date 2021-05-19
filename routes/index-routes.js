const router = require('express').Router();

const ensureLogin = require('connect-ensure-login');

router.use('/auth/', require('./auth-route'));

router.use('/secret/', ensureLogin.ensureLoggedIn( { redirectTo : '/auth/login' }) ,require('./secret-route'));

module.exports = router;