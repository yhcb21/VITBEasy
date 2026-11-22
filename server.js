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

// Serve static frontend files – Vite builds to "dist"
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "dist")));
  // Fallback to built index.html for SPA routes
  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "dist", "index.html"))
  );
} else {
  // Development – serve public folder (fallback for static assets)
  app.use(express.static(path.join(__dirname, "public")));
}

// Serve uploaded item images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/items", itemRoutes);

app.get("/api/health", (req, res) =>
  res.json({ ok: true, message: "VITBeasy API is running" })
);

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