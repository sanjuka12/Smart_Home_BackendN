const express = require('express');
const router = express.Router();
const { getUser } = require('../controllers/userController');

// GET /api/users/:userName → Fetch specific user
router.get('/:userName', getUser);

module.exports = router;
