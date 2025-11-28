// routes/maintenanceroutes.js

const express = require("express");
const router = express.Router();

const {
  getAllMaintenance,
  addMaintenance,
} = require("../controllers/Maintenancecontroller");

// ➤ GET all maintenance logs
router.get("/maintenance", getAllMaintenance);

// ➤ POST new maintenance entry
router.post("/maintenance", addMaintenance);

module.exports = router;
