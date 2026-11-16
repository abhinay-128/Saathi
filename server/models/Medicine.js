const mongoose = require("mongoose");
const medicineSchema = new mongoose.Schema({
    elder:{type:mongoose.Schema.Types.ObjectId,ref:"Elder",required:true},
    name: {type:String,required:true},
    times:[{type:String}],
}, { timestamps: true });

module.exports = mongoose.model("Medicine", medicineSchema);