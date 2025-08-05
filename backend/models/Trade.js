const mongoose = require("mongoose");

const tradeSchema = new mongoose.Schema({
  sport: {
    type: String,
    enum: ["football", "cricket"],
    required: true,
  },
  match: {
    type: String,
    required: true,
  },
  marketType: {
    type: String,
    required: true, // e.g., Match Winner, Over/Under
  },
  odds: {
    type: Number,
    required: true,
  },
  stake: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // assumes you will have a User model
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Trade", tradeSchema);
