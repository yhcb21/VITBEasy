const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    dishName: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      required: true,
      trim: true
    },
    userName: {
      type: String,
      default: 'Anonymous Student',
      trim: true
    },
    mealContext: {
      type: String,  // e.g. "Monday Lunch"
      trim: true
    }
  },
  { timestamps: true }  // gives us createdAt and updatedAt for free
);

module.exports = mongoose.model('Review', reviewSchema);
