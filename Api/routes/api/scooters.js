const express = require('express');
const router = express.Router();
const scooterController = require('../../controllers/scooterController.js');

router.get('/', scooterController.getScootersLocation);
router.post('/', scooterController.addScooter);

module.exports = router;