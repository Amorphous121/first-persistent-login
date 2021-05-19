const router = require('express').Router();
const Secret_Ctrl = require('../controllers/secret-controller');

router.get('/home',  Secret_Ctrl.homePage );

router.get('/profile', Secret_Ctrl.profile);

module.exports = router;