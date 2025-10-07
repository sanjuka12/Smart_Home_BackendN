const db = require('../config/firebaseConfig');

// ✅ DEFINE THIS FIRST
const updateLiveSolarData = async (data) => {
  const docRef = db.collection('realtimesolardata').doc(data.UnitId); // use UnitId as document ID
  await docRef.set({
    timestamp: new Date(),
    ...data
  });
};

// ✅ FETCH ALL LIVE DATA
const getAllLiveData = async () => {
  try {
    const snapshot = await db.collection('realtimesolardata').get();

    const data = [];
    snapshot.forEach(doc => {
      data.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return data;
  } catch (error) {
    throw error;
  }
};

// ✅ FETCH LIVE DATA BY ID
const getLiveDataById = async (inverterId) => {
  const docRef = db.collection('realtimesolardata').doc(inverterId);
  const doc = await docRef.get();
  return doc;
};

// ✅ EXPORT ALL FUNCTIONS
module.exports = {
  updateLiveSolarData,
  getAllLiveData,
  getLiveDataById
};
