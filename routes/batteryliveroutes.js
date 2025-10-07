// routes/liveDataRoutes.js
const express = require('express');
const router = express.Router();
const { updateRealtimeData, fetchAllLiveData, fetchLiveDataById } = require('../controllers/batterylivecontroller');

router.post('/realtimebatterydata', updateRealtimeData);
router.get('/livedatabattery', fetchAllLiveData);
router.get('/livedatabattery/:inverterId', fetchLiveDataById);
router.get('/realtimebatterydata/:inverterId', fetchLiveDataById);

module.exports = router;
