require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const reviewRoutes = require('./routes/reviews');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mess Menu review endpoints
app.use('/api/reviews', reviewRoutes);

// Health check
app.get('/api/health', (req, res) => res.json({ ok: true, service: 'mess-menu-api' }));

// Connect to MongoDB then start server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () =>
      console.log(`Mess Menu API running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
  });
