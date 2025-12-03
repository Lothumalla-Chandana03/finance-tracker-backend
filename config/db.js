// We need mongoose to connect our Node.js app to MongoDB
const mongoose = require("mongoose");
// function will connect to the database
const connectDB = async () => {
  try {
    // Try to connect to MongoDB using the URL stored in .env file
    await mongoose.connect(process.env.MONGO_URI);

    // If everything goes well, we log that the connection is successful
    console.log("MongoDB Connected Successfully");
  
  } catch (error) {
    // If something goes wrong, log the error
    console.error("MongoDB Connection Failed:", error.message);

    // Stop the app because the database connection 
    process.exit(1);
  }
};
// Make this function available to use in other files
module.exports = connectDB;
