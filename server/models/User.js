const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  elders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Elder" }],
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);