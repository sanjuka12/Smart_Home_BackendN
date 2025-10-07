const express = require('express');
const router = express.Router();
const { saveInverterData, fetchInverterData, deleteAllInverterData } = require('../controllers/batterycontroller');

// POST /api/inverter
router.post('/batteryinverterdata', saveInverterData);
router.get('/batteryinverterdata', fetchInverterData);
router.delete('/batteryinverterdata', deleteAllInverterData);

module.exports = router;