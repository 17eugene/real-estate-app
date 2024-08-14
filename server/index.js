const express = require("express");
const { authRoutes, userRoutes, listingRoutes } = require("./routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/listing", listingRoutes);

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
    app.listen(PORT, () => console.log(`Server run on port ${PORT}`));
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
