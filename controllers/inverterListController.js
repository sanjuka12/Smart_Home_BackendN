const { createInverter, getAllInverters } = require('../models/inverterListModel');

async function addInverter(req, res) {
  try {
    const inverterData = req.body;

    // Basic validation (optional)
    const requiredFields = ['Address','InstalledCapacity','Latitude','Location','Longitude','Name','Power','Status','Type','UnitId'];
    for (const field of requiredFields) {
      if (!inverterData[field]) {
        return res.status(400).json({ message: `Field ${field} is required` });
      }
    }

    inverterData.createdAt = new Date();

    const id = await createInverter(inverterData);
    res.status(201).json({ message: "Inverter added successfully", id });
  } catch (error) {
    console.error("Error adding inverter:", error);
    res.status(500).json({ message: "Failed to add inverter" });
  }
}

const fetchInverters = async (req, res) => {
  try {
    const data = await getAllInverters();
    res.status(200).json(data);
  } catch (err) {
    console.error('Error fetching inverters:', err);
    res.status(500).json({ message: 'Failed to fetch inverter data' });
  }
};

async function retrieveInverterSummary(req, res) {
  try {
    const entries = await getAllInverters();

    const totalItems = entries.length;
    const overallCapacity = entries.reduce((acc, item) => acc + Number(item.InstalledCapacity || 0), 0);

    res.status(200).json({
      totalItems,
      overallCapacity,
      records: entries
    });
  } catch (err) {
    console.error("Retrieval failed:", err);
    res.status(500).json({ error: "Unable to fetch inverter records" });
  }
}

module.exports = {
  addInverter,
  fetchInverters,
  retrieveInverterSummary
};