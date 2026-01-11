// cleanup.js
const cron = require('node-cron');
const { db } = require('./config/firebaseConfig'); // <-- use ./config
const dayjs = require('dayjs');

// 🕒 Run every hour (change to '*/10 * * * *' for every 10 mins)
cron.schedule('0 * * * *', async () => {
  console.log('🧹 Running scheduled cleanup job...');

  const cutoff = dayjs().subtract(48, 'hour').toDate();

  // ✅ 1. Collections to clean by timestamp (keep last 48 hours)
  const timeBasedCollections = [
    'BatteryData',
    'InverterData'
    // Add more collections if needed
  ];

  for (const col of timeBasedCollections) {
    try {
      const snapshot = await db.collection(col)
        .where('timestamp', '<', cutoff)
        .get();

      if (snapshot.empty) {
        console.log(`✅ No old data found in ${col}`);
        continue;
      }

      // Delete in batches of 500 (Firestore batch limit)
      let count = 0;
      let batch = db.batch();

      snapshot.forEach((doc, idx) => {
        batch.delete(doc.ref);
        count++;
        if (count % 500 === 0) {
          batch.commit();
          batch = db.batch();
        }
      });

      await batch.commit();
      console.log(`🗑️ Deleted ${snapshot.size} old docs from ${col}`);
    } catch (err) {
      console.error(`⚠️ Error cleaning ${col}:`, err);
    }
  }

  // ✅ 2. Keep only latest 20 logins in userlog collection
  try {
    console.log('🧾 Checking userlog collection...');
    const logsSnapshot = await db.collection('userlog')
      .orderBy('timestamp', 'desc') // newest first
      .get();

    if (logsSnapshot.size > 20) {
      const docsToDelete = logsSnapshot.docs.slice(20); // skip top 20 newest
      let batch = db.batch();
      docsToDelete.forEach((doc, idx) => {
        batch.delete(doc.ref);
        // Commit every 500 deletions (Firestore limit)
        if ((idx + 1) % 500 === 0) {
          batch.commit();
          batch = db.batch();
        }
      });
      await batch.commit();

      console.log(`🗑️ Deleted ${docsToDelete.length} old userlog entries.`);
    } else {
      console.log(`✅ userlog has ${logsSnapshot.size} entries (within limit).`);
    }
  } catch (err) {
    console.error('⚠️ Error cleaning userlog:', err);
  }

  console.log('✅ Cleanup completed.\n');
});
