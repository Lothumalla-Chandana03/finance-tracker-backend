const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
dotenv.config();
connectDB();
const app = express();

app.use(cors());
app.use(bodyParser.json());


// Auth routes
app.use("/api/auth", require("./routes/authRoutes"));


// Transaction routes
app.use("/api/transactions", require("./routes/transactionRoutes"));


app.get("/", (req, res) => {
  res.send("Finance Tracker API is running...");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


