const express = require("express");
const router = express.Router();
const { addUserLog, getUserLogs, deleteAllUserLogs  } = require("../controllers/userLogController");


router.post("/userlog", addUserLog);
router.get("/userlog", getUserLogs);
router.delete("/userlog", deleteAllUserLogs);

module.exports = router;
