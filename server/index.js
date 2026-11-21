require("dotenv").config();

const express=require("express");
const cors = require("cors");
const app=express();
app.use(cors());
app.use(express.json());
app.use("/api/elders", require("./routes/elders"));
app.use("/api/medicines", require("./routes/medicines"));
app.use("/api/checkins", require("./routes/checkIns"));
app.use("/api/doselogs", require("./routes/doseLogs"));
app.use("/api/auth", require("./routes/auth"));
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err.message)); 
app.get("/",(req,res)=>{
    res.send("Saathi server is running and updated");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});