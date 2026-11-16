const express = require("express");
const router = express.Router();

const CheckIn = require("../models/CheckIn");

router.post("/", async (req, res) => {
  try {
    const checkIn = await CheckIn.create(req.body);
    res.status(201).json(checkIn);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const checkIns = await CheckIn.find()
      .populate("elderId");

    res.json(checkIns);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/elder/:elderId", async (req, res) => {
  try {
    const checkIns = await CheckIn.find({
      elderId: req.params.elderId,
    }).populate("elderId");

    res.json(checkIns);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/latest/:elderId", async (req, res) => {
  try {
    const checkIn = await CheckIn.findOne({
      elderId: req.params.elderId,
    })
      .sort({ createdAt: -1 })
      .populate("elderId");

    res.json(checkIn);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;