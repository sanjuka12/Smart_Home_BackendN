const db = require('../config/firebaseConfig');

const addInverterData = async (data) => {
  const docRef = await db.collection('InverterData').add({
    timestamp: new Date(),
    ...data
  });
  return docRef.id;
};

const getAllInverterData = async () => {
  const snapshot = await db.collection('InverterData')
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
  const snapshot = await db.collection("InverterData").get();
  const batch = db.batch();

  snapshot.forEach(doc => {
    batch.delete(doc.ref);
  });

  await batch.commit();
  return { deleted: snapshot.size };
};

const getTodayInverterData = async (UnitId) => {
  const now = new Date();
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const snapshot = await db.collection("InverterData")
    .where("UnitId", "==", UnitId)
    .where("timestamp", ">=", start)
    .where("timestamp", "<=", now)
    .orderBy("timestamp", "asc")
    .get();

  const result = [];
  snapshot.forEach(doc => result.push({ id: doc.id, ...doc.data() }));
  return result;
};


module.exports = { addInverterData, getAllInverterData, deleteAllInverterDataFromDB, getTodayInverterData};
