const db = require('../config/firebaseConfig');

const addInverterData = async (data) => {
  const docRef = await db.collection('BatteryData').add({
    timestamp: new Date(),
    ...data
  });
  return docRef.id;
};

const getAllInverterData = async () => {
  const snapshot = await db.collection('BatteryData')
                           .orderBy('timestamp', 'asc')
                           .get();

  const data = [];

  snapshot.forEach(doc => {
    // Avoid the 'counter' document if you have one
    if (doc.id !== 'counter') {
      data.push({ id: doc.id, ...doc.data() });
    }
  });

  return data;
};

const deleteAllInverterDataFromDB = async () => {
  const snapshot = await db.collection("BatteryData").get();
  const batch = db.batch();

  snapshot.forEach(doc => {
    batch.delete(doc.ref);
  });

  await batch.commit();
  return { deleted: snapshot.size };
};

const deleteOldestBatteryData = async (limit = 5000) => {
  const snapshot = await db.collection("BatteryData")
    .orderBy("timestamp", "asc")  // oldest first
    .limit(limit)
    .get();

  if (snapshot.empty) {
    return { deleted: 0, message: "No documents to delete" };
  }

  const batch = db.batch();
  snapshot.forEach(doc => {
    batch.delete(doc.ref);
  });

  await batch.commit();

  return { deleted: snapshot.size, message: `Deleted ${snapshot.size} oldest documents` };
};


module.exports = { addInverterData, getAllInverterData, deleteAllInverterDataFromDB, deleteOldestBatteryData };
