// controllers/userLogController.js
const admin = require("firebase-admin");
const db = admin.firestore();
const { formatUserLog, deleteAllUserLogsFromDB} = require("../models/userLogModel");

exports.addUserLog = async (req, res) => {
  try {
    const { userName, role, inverterAccess } = req.body;

    if (!userName || !role || !inverterAccess) {
      return res.status(400).json({ message: "userName and role are required" });
    }

    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-GB'); // e.g., "29/05/2025"
    const loginTime = now.toLocaleTimeString(); // e.g., "14:35:21"
    const logout = ' - ';

    const logData = {
      userName,
      role,
      date: formattedDate,
      login: loginTime,
      logout:logout,
      inverterAccess
    };

    await db.collection("userlog").add(logData);

    res.status(201).json({ message: "User log added successfully", data: logData });
  } catch (error) {
    console.error("Error adding user log:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



// controllers/userLogController.js
exports.getUserLogs = async (req, res) => {
  try {
    let query = db.collection("userlog");

    // Optional date filter
    if (req.query.date) {
      query = query.where('date', '==', req.query.date);
    }

    // Limit to 20 documents
    query = query.limit(20);

    const snapshot = await query.get();

    if (snapshot.empty) {
      return res.status(404).json({ message: "No logs found" });
    }

    let logs = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Sort descending by date (string dd/mm/yyyy)
    logs.sort((a, b) => {
      const [da, ma, ya] = a.date.split('/').map(Number);
      const [db_, mb, yb] = b.date.split('/').map(Number);
      return new Date(yb, mb - 1, db_) - new Date(ya, ma - 1, da);
    });

    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching logs", error });
  }
};

exports.deleteAllUserLogs = async (req, res) => {
  try {
    const result = await deleteAllUserLogsFromDB();
    res.status(200).json({ message: "All user logs deleted", ...result });
  } catch (error) {
    console.error("Error deleting user logs:", error);
    res.status(500).json({ message: "Failed to delete user logs" });
  }
};