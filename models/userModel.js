const db = require('../config/firebaseConfig'); // Firestore config

const usersCollection = db.collection('Login');

// ✅ Get user by userName
const getUserByUserName = async (userName) => {
  const snapshot = await usersCollection.where('userName', '==', userName).get();

  if (snapshot.empty) {
    return null; // No matching user found
  }

  let userData = null;
  snapshot.forEach(doc => {
    userData = { id: doc.id, ...doc.data() };
  });

  return userData;
};

module.exports = {
  getUserByUserName
};
