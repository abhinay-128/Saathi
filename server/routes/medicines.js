const express=require("express");
const router=express.Router();
const Medicine=require("../models/Medicine");

router.post("/", async (req, res) => {
  const medicine = await Medicine.create(req.body);
  res.status(201).json(medicine);
});

router.get("/", async (req, res) => {
  const medicines = await Medicine.find();
  res.json(medicines);
});

router.get("/elder/:elderId", async (req, res) => {
  try {
    const medicines = await Medicine.find({
      elder: req.params.elderId,
    });

    res.json(medicines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/today/:elderId", async (req, res) => {
  try {
 const medicines = await Medicine.find({
  elder: req.params.elderId,
}).select("name times");

    res.json(medicines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports= router;