const mongoose = require("mongoose");

const doseLogSchema = new mongoose.Schema({
  elder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Elder",
    required: true,
  },

  medicine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Medicine",
    required: true,
  },

  status: {
    type: String,
    enum: ["taken", "missed"],
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model("DoseLog", doseLogSchema);