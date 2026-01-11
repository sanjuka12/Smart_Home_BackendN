// models/maintenancemodel.js

const formatMaintenanceData = (doc) => ({
  id: doc.id,
  ...doc.data(),
});

module.exports = { formatMaintenanceData };
