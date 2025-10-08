// app.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const loginRoutes = require("./routes/loginRoutes");
const userLogRoutes = require("./routes/userLogRoutes");
const inverterRoutes = require('./routes/inverterRoutes');
const liveDataRoutes = require('./routes/liveDataRoutes');
const inverterListRoutes = require('./routes/inverterListRoutes');
const batteryroutes = require('./routes/batteryroutes');
const batteryliveroutes = require('./routes/batteryliveroutes');
const userRoutes = require('./routes/userRoutes');

app.use(cors({
  origin: [
    "http://localhost:3001",
    "https://smart-home-frontend-cdpi3poon-sanjuka12s-projects.vercel.app"
  ],
  credentials: true
}));

app.use(bodyParser.json());
app.use(express.json());

// Store live history
let history = [];

// ESP32 sends solar data
app.post("/realtimedata", (req, res) => {
  const { UnitId, gridStatus, voltage, current, frequency, power } = req.body;
  const data = { UnitId, type: "solar", gridStatus, voltage, current, frequency, power, timestamp: new Date() };

  history.push(data);

  const io = req.app.get("io");
  io.to(UnitId).emit("newData", data);

  console.log("Received from ESP32:", data);
  res.sendStatus(200);
});

// ESP32 sends battery data
app.post("/realtimebatterydata", (req, res) => {
  const { UnitId, gridStatus, voltage, current, power, soc } = req.body;
  const data = { UnitId, type: "battery", gridStatus, voltage, current, power, soc, timestamp: new Date() };

  const io = req.app.get("io");
  io.to(UnitId).emit("newData", data);

  console.log("Received battery data:", data);
  res.sendStatus(200);
});

// Fetch history
app.get("/history", (req, res) => res.json(history));

// Routes
app.use("/", loginRoutes);
app.use("/", userLogRoutes);
app.use("/", inverterRoutes);
app.use("/", liveDataRoutes);
app.use("/", inverterListRoutes);
app.use("/", batteryroutes);
app.use("/", batteryliveroutes);
app.use("/users", userRoutes);


app.get("/", (req, res) => {
  res.send("✅ Smart Home Backend is running successfully!");
});

module.exports = app;
