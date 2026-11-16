const express = require("express");
const router = express.Router();
const Elder = require("../models/Elder");

router.post("/", async (req, res) => {
  const elder = await Elder.create(req.body);
  res.status(201).json(elder);
});

router.get("/", async (req, res) => {
  const elders = await Elder.find();
  res.json(elders);
});

module.exports = router;