const express = require("express");
const router = express.Router();
const DoseLog = require("../models/DoseLog");
const CheckIn = require("../models/CheckIn");
const Elder = require("../models/Elder");

router.get("/:elderId", async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const missedToday = await DoseLog.countDocuments({
      elder: req.params.elderId,
      status: "missed",
      createdAt: { $gte: startOfDay },
    });

        const checkInToday = await CheckIn.findOne({
      elderId: req.params.elderId,
      createdAt: { $gte: startOfDay },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});