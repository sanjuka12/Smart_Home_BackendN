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


module.exports = { addInverterData, getAllInverterData, deleteAllInverterDataFromDB };
