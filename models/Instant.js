const mongoose = require("mongoose");

const InstantSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  length: Number,
  latitude: Number,
  longitude: Number,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("instant", InstantSchema);
