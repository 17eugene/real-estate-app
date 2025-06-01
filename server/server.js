const express = require("express");
const { Server } = require("socket.io");
const { createServer } = require("http");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: ["http://localhost:3000"] },
});

app.use(express.json());

io.on("connection", (socket) => {
  console.log("user connected", socket.id);

  socket.on("join-room", (data) => {
    socket.join(data);
  });

  // socket.on("send-message", (message) => {
  //   socket.broadcast.emit("receive-message", message);
  // });

  socket.on("disconnected", () => {
    console.log("user disconnected", socket.id);
  });
});

module.exports = { app, httpServer, io };
