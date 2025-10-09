const http = require("http");
const app = require("./app");
const PORT = process.env.PORT || 3000;

// Create HTTP server
const server = http.createServer(app);

// Setup Socket.IO
const io = require("socket.io")(server, {
  cors: {
    origin: [
      "http://localhost:3001",
      "https://smart-home-frontend-cdpi3poon-sanjuka12s-projects.vercel.app",
      "http://147.93.30.1:3001"
    ],
    credentials: true,
  },
});

// Attach io to app so routes/controllers can access it
app.set("io", io);

io.on("connection", (socket) => {
  console.log("🟢 Frontend connected:", socket.id);

  socket.on("subscribe", (UnitId) => {
    console.log(`Socket ${socket.id} subscribed to inverter ${UnitId}`);
    socket.join(UnitId);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Frontend disconnected:", socket.id);
  });
});

// Start the server (use the HTTP server, not app.listen)
server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});
