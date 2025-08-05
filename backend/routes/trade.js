// routes/trade.js
const express = require("express");
const router = express.Router();
const Trade = require("../models/Trade");

// POST a new trade
router.post("/", async (req, res) => {
  try {
    const { sport, match, marketType, odds, stake, userId } = req.body;

    const newTrade = new Trade({
      sport,
      match,
      marketType,
      odds,
      stake,
      userId,
    });

    await newTrade.save();
    res.status(201).json({ message: "Trade saved successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to save trade", details: error.message });
  }
});

// GET all trades
router.get("/", async (req, res) => {
  try {
    const trades = await Trade.find();
    res.status(200).json(trades);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch trades", details: error.message });
  }
});

module.exports = router;
