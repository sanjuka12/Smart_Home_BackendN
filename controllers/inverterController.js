const { addInverterData, getAllInverterData, deleteAllInverterDataFromDB} = require('../models/inverterModel');

const saveInverterData = async (req, res) => {
  try {
    const { UnitId, gridStatus, voltage, current, frequency } = req.body;

    if (gridStatus=== undefined || voltage === undefined || current === undefined || frequency === undefined || UnitId === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

   const solarpower = current * voltage;

    const id = await addInverterData({ UnitId, gridStatus, voltage, current, frequency, solarpower });

    res.status(200).json({ message: 'Data saved', id });
  } catch (error) {
    console.error("Error saving inverter data:", error);
    res.status(500).json({ error: 'Failed to store data' });
  }
};

const fetchInverterData = async (req, res) => {
  try {
    const data = await getAllInverterData();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching inverter data:', error);
    res.status(500).json({ error: 'Failed to fetch inverter data' });
  }
};


const deleteAllInverterData = async (req, res) => {
  try {
    const result = await deleteAllInverterDataFromDB(); // ✅ calls model, not itself
    res.status(200).json({ message: "All inverter data deleted", ...result });
  } catch (error) {
    console.error("Error deleting inverter data:", error);
    res.status(500).json({ error: "Failed to delete inverter data" });
  }
};

module.exports = { saveInverterData, fetchInverterData, deleteAllInverterData};
