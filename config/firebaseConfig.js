
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Check if database is accessible
(async () => {
  try {
    await db.collection("Login").limit(1).get(); // simple test query
    console.log("✅ Firestore DB Connected");
  } catch (error) {
    console.error("❌ Firestore DB Disconnected", error.message);
  }
})();

module.exports = db;




