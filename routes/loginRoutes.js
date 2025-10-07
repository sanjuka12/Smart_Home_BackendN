// routes/loginRoutes.js
const express = require("express");
const router = express.Router();
const { addUser, login } = require('../controllers/loginController'); 

router.post("/login", login);
router.post('/adduser', addUser);

module.exports = router;
