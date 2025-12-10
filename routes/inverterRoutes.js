const express = require('express');
const router = express.Router();
const { saveInverterData, fetchInverterData, deleteAllInverterData, getTodayEnergy} = require('../controllers/inverterController');

// POST /api/inverter
router.post('/solarinverterdata', saveInverterData);
router.get('/solarinverterdata', fetchInverterData);
router.delete('/solarinverterdata', deleteAllInverterData);
router.get("/today-energy", getTodayEnergy);



module.exports = router;