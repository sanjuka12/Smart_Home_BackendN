const express = require('express');
const router = express.Router();
const { saveInverterData, fetchInverterData, deleteAllInverterData, deleteOldestInverterData } = require('../controllers/batterycontroller');

// POST /api/inverter
router.post('/batteryinverterdata', saveInverterData);
router.get('/batteryinverterdata', fetchInverterData);
router.delete('/batteryinverterdata', deleteAllInverterData);
router.delete('/delete-oldest', deleteOldestInverterData);

module.exports = router;