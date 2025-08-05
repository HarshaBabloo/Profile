const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const User = require("./models/User");
const Trade = require("./models/Trade");
const tradeRoutes = require("./routes/trade");

// Load .env variables
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/trades", tradeRoutes);

// Postman
app.post("/api/test-user", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: "User saved successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to save user", details: err.message });
  }
});

// //TradeRoute
// app.post("/api/trades", async (req, res) => {
//   try {
//     const { sport, match, marketType, odds, stake, userId } = req.body;

//     const newTrade = new Trade({
//       sport,
//       match,
//       marketType,
//       odds,
//       stake,
//       userId,
//     });

//     await newTrade.save();
//     res.status(201).json({ message: "Trade saved successfully" });
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ error: "Failed to save trade", details: error.message });
//   }
// });

// //Get Method
// app.get("/api/trades", async (req, res) => {
//   try {
//     const trades = await Trade.find();
//     res.status(200).json(trades);
//   } catch (err) {
//     res
//       .status(500)
//       .json({ error: "Failed to fetch trades", details: err.message });
//   }
// });

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
