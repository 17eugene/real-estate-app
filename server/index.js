const { app, httpServer, io } = require("./server");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const {
  authRoutes,
  userRoutes,
  listingRoutes,
  chatRoutes,
  locationRoutes,
} = require("./routes");

const PORT = process.env.PORT || 2222;
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "log-file.log"),
  { flags: "a" }
);

app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(morgan("combined", { stream: accessLogStream }));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/listing", listingRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/location", locationRoutes);

// io.on("connection", (socket) => {
//   console.log(socket.connected);

//   socket.on("create-room", (data) => {
//     socket.join(data);
//   });

//   socket.on("send-message", (message) => {
//     socket.broadcast.emit("receive-message", message);
//   });
// });

app.use((_, res) => {
  res.status(404).json({ message: "Error 404: not found" });
});

app.use((err, _, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Server error";

  res.status(status).json({ message });
});

mongoose
  .connect(process.env.DB_HOST)
  .then(console.log("Connected to DB"))
  .then(() => {
    httpServer.listen(PORT, () => console.log(`Server run on port ${PORT}`));
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
