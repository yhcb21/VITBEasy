
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      enum: ["Electronics", "Documents", "Accessories", "Bags", "Clothing", "Other"],
      required: true
    },
    type: {
      type: String,
      enum: ["lost", "found"],
      required: true
    },
    location: {
      type: String,
      required: true,
      trim: true
    },
    date: {
      type: Date,
      required: true
    },
    image: {
      type: String,
      default: ""
    },
    postedBy: {
      type: String,
      required: true,
      trim: true
    },
    contact: {
      type: String,
      required: true,
      trim: true
    },
    status: {
      type: String,
      enum: ["active", "claimed"],
      default: "active"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);
