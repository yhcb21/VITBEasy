require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const itemRoutes = require("./routes/items");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

// Serve uploaded item images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/items", itemRoutes);

app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "VITBeasy API is running" });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    console.log("Start MongoDB or change MONGODB_URI in .env");
  });