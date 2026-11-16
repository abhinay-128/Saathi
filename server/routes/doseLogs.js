const express = require("express");
const router = express.Router();

const DoseLog = require("../models/DoseLog");
// Create Dose Log
router.post("/", async (req, res) => {
  try {
    const doseLog = await DoseLog.create(req.body);
    res.status(201).json(doseLog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// Get All Dose Logs

router.get("/", async (req, res) => {
  try {
    const doseLogs = await DoseLog.find()
      .populate("elder")
      .populate("medicine");

    res.json(doseLogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Get Dose Logs For One Elder

router.get("/elder/:elderId", async (req, res) => {
  try {
    const doseLogs = await DoseLog.find({
      elder: req.params.elderId,
    })
      .populate("elder")
      .populate("medicine");

    res.json(doseLogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Dashboard Stats
router.get("/stats/:elderId", async (req, res) => {
  try {
    const total = await DoseLog.countDocuments({
      elder: req.params.elderId,
    });

    const taken = await DoseLog.countDocuments({
      elder: req.params.elderId,
      status: "taken",
    });

    const missed = await DoseLog.countDocuments({
      elder: req.params.elderId,
      status: "missed",
    });

 const adherence =
  total === 0 ? 0 : ((taken / total) * 100).toFixed(2);

res.json({
  total,
  taken,
  missed,
  adherence,
});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/medicine/:medicineId", async (req, res) => {
  try {
    const logs = await DoseLog.find({
      medicine: req.params.medicineId,
    })
      .populate("elder")
      .populate("medicine")
      .sort({ createdAt: -1 });

    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
