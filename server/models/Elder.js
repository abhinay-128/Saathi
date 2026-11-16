const mongoose = require("mongoose");

const elderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  language: { type: String, default: "hi" },
}, { timestamps: true });

module.exports=mongoose.model("Elder",elderSchema);