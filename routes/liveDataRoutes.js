// routes/liveDataRoutes.js
const express = require('express');
const router = express.Router();
const { updateRealtimeData, fetchAllLiveData, fetchLiveDataById } = require('../controllers/liveDataController');

router.post('/realtimesolardata', updateRealtimeData);
router.get('/livedata', fetchAllLiveData);
router.get('/livedata/:inverterId', fetchLiveDataById);
router.get('/realtimesolardata/:inverterId', fetchLiveDataById);

module.exports = router;
