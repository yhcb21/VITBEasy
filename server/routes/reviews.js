const express = require('express');
const Review = require('../models/Review');

const router = express.Router();

// GET all reviews, optionally filtered by dish name
// Example: GET /api/reviews?dish=Sambar
router.get('/', async (req, res) => {
  try {
    const filter = req.query.dish ? { dishName: req.query.dish } : {};
    const reviews = await Review.find(filter).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new dish review
// Body: { dishName, rating, comment, userName, mealContext }
router.post('/', async (req, res) => {
  try {
    const { dishName, rating, comment, userName, mealContext } = req.body;
    const review = await Review.create({ dishName, rating, comment, userName, mealContext });
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
