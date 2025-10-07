// models/loginModel.js
const db = require("../config/firebaseConfig")

const loginCollection = db.collection("Login");

const findUserByUsername = async (username) => {
  const snapshot = await loginCollection.where("userName", "==", username).get();
  if (snapshot.empty) return null;

  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() };
};

const addUser = async (userData) => {
  const docRef = await db.collection('Login').add({
    ...userData,
    createdAt: new Date()
  });
  return docRef.id;
};


module.exports = {
  findUserByUsername,
  addUser
};
