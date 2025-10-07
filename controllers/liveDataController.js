const {
  updateLiveSolarData,
  getAllLiveData,
  getLiveDataById,
} = require('../models/liveDataModel');

// POST /api/realtimesolardata
const updateRealtimeData = async (req, res) => {
  try {
    const { UnitId, gridStatus, voltage, current, frequency } = req.body;

    if (!UnitId || !gridStatus || voltage === undefined || current === undefined || frequency === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const solarpower = current * voltage;

    await updateLiveSolarData({ UnitId, gridStatus, voltage, current, frequency, solarpower });

    res.status(200).json({ message: 'Live data updated' });
  } catch (error) {
    console.error("Error updating live data:", error);
    res.status(500).json({ error: 'Failed to update live data' });
  }
};

// GET /api/realtimesolardata
const fetchAllLiveData = async (req, res) => {
  try {
    const data = await getAllLiveData();
    res.json(data);
  } catch (error) {
    console.error('Error fetching live data:', error.message);
    res.status(500).json({ error: 'Failed to fetch live data' });
  }
};

// GET /api/realtimesolardata/:inverterId
const fetchLiveDataById = async (req, res) => {
  try {
    const inverterId = req.params.inverterId;
    const doc = await getLiveDataById(inverterId);
    if (!doc.exists) {
      return res.status(404).json({ error: 'Data not found' });
    }
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error('Error fetching inverter data:', error.message);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};

exports.receiveLiveData = (req, res) => {
  const data = req.body;
  console.log("✅ Live data received from ESP32:", data);

  // Broadcast to all WebSocket clients
  const clients = req.app.get("wssClients");
  clients.forEach(client => {
    if (client.readyState === 1) {
      client.send(JSON.stringify(data));
    }
  });

  res.status(200).send("Live data broadcasted");
};
module.exports = {
  updateRealtimeData,
  fetchAllLiveData,
  fetchLiveDataById
};
