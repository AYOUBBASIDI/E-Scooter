const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController.js');

router.get('/days/:lat&:long', weatherController.handleWeatherByDay);
router.get('/hours/:day&:lat&:long', weatherController.handleWeatherByHour);

module.exports = router;