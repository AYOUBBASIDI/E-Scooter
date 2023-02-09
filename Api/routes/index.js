//set routes here
const router = require('express').Router();
const auth = require('./auth');
const register = require('./register');
const refresh = require('./refresh');
const logout = require('./logout');
const weather = require('./weather.js');

router.use('/auth', auth);
router.use('/register', register);
router.use('/refresh', refresh);
router.use('/logout', logout);
router.use('/weather', weather);

module.exports = router;
