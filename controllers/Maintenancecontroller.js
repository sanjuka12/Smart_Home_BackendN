// controllers/maintenancecontroller.js
const db = require("../config/firebaseConfig")
const { formatMaintenanceData } = require("../models/Maintenancemodel");


// ➤ GET all maintenance logs
exports.getAllMaintenance = async (req, res) => {
  try {
    const snapshot = await db.collection("Maintenance").get();

    const maintenanceList = snapshot.docs.map((doc) =>
      formatMaintenanceData(doc)
    );

    res.status(200).json(maintenanceList);
  } catch (error) {
    console.error("Error fetching maintenance logs:", error);
    res.status(500).json({ error: "Failed to fetch maintenance data" });
  }
};



// ➤ ADD a new maintenance log
exports.addMaintenance = async (req, res) => {
  try {
    const { InverterId, Location, Message, severity } = req.body;

    await db.collection("Maintenance").add({
      InverterId,
      Location,
      Message,
      severity,
      createdAt: new Date(),
    });

    res.status(201).json({ message: "Maintenance log added successfully" });
  } catch (error) {
    console.error("Error adding maintenance log:", error);
    res.status(500).json({ error: "Failed to add maintenance log" });
  }
};
