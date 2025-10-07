const express = require('express');
const router = express.Router();
const { saveInverterData, fetchInverterData, deleteAllInverterData} = require('../controllers/inverterController');

// POST /api/inverter
router.post('/solarinverterdata', saveInverterData);
router.get('/solarinverterdata', fetchInverterData);
router.delete('/solarinverterdata', deleteAllInverterData);



module.exports = router;