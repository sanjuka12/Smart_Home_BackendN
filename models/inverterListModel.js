// models/inverterListModel.js

const db = require('../config/firebaseConfig');

const inverterCollection = db.collection('InverterList');

/**
 * Creates a new inverter document in Firestore.
 * @param {Object} data - The inverter data.
 * @returns {Promise<string>} The ID of the created document.
 * @throws Will throw an error if Firestore write fails.
 */
async function createInverter(data) {
 

  const docRef = await inverterCollection.add(data);
  return docRef.id;
}


const getAllInverters = async () => {
  const snapshot = await db.collection('InverterList').get();
  const inverters = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return inverters;
};

module.exports = {
  getAllInverters,
  createInverter
};