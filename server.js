/*const express = require("express");
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

*/
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const morgan = require("morgan");

dotenv.config();

const app = express();


// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/transactions", require("./routes/transactionRoutes"));

// Test route
app.get("/", (req, res) => {
  res.send("Finance Tracker API is running...");
});

// Listen on Render port
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => console.log(`Finance Tracker API running on port ${PORT}`));

