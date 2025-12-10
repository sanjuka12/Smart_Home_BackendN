const { addInverterData, getAllInverterData, deleteAllInverterDataFromDB, getTodayInverterData} = require('../models/inverterModel');

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

const getTodayEnergy = async (req, res) => {
  try {
    const { UnitId } = req.query;
    if (!UnitId) {
      return res.status(400).json({ error: "Missing unitId" });
    }

    const data = await getTodayInverterData(UnitId);

    if (!data.length) {
      return res.status(200).json({ energyToday: 0 });
    }

    // Sort by timestamp
    data.sort((a, b) => a.timestamp.toDate() - b.timestamp.toDate());

    let totalEnergyWh = 0; // Watt-hour accumulator

    for (let i = 1; i < data.length; i++) {
      const prev = data[i - 1];
      const curr = data[i];

      // Difference in minutes
      const diffMs = curr.timestamp.toDate() - prev.timestamp.toDate();
      const diffHours = diffMs / 1000 / 3600; 

      const avgPower = (prev.solarpower + curr.solarpower) / 2; // W
      const energy = avgPower * diffHours; // Wh

      totalEnergyWh += energy;
    }

    const totalEnergyKWh = (totalEnergyWh / 1000).toFixed(2);

    res.status(200).json({ energyToday: totalEnergyKWh });

  } catch (error) {
    console.error("Error calculating energy:", error);
    res.status(500).json({ error: "Failed to calculate energy" });
  }
};


module.exports = { saveInverterData, fetchInverterData, deleteAllInverterData, getTodayEnergy};
