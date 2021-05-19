const router = require('express').Router();
const auth = require('../controllers/auth-ctrl');
const passport = require('passport');

const ensureConnetLogin = require('connect-ensure-login');

router.get('/login', auth.getLogin);

router.get('/register', ensureConnetLogin.ensureLoggedOut( { redirectTo : '/auth/logout' } ) ,auth.getRegister);

router.post('/login', passport.authenticate('local', { successReturnToOrRedirect : '/' , failureRedirect : '/auth/login' , successRedirect : '/secret/home' }), );

router.post('/register', auth.postRegister);

router.get('/logout', auth.logout);

module.exports = router;