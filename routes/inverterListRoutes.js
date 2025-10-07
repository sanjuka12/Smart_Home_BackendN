// routes/inverterListRoutes.js
const express = require('express');
const router = express.Router();
const inverterListController = require('../controllers/inverterListController');

// POST /addinverter
router.post('/addinverter', inverterListController.addInverter);
router.get('/listInverters', inverterListController.fetchInverters);
router.get("/inverters/summary", inverterListController.retrieveInverterSummary);

module.exports = router;
