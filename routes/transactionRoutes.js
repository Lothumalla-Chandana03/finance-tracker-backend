const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware"); // middleware
const {
  addTransaction,
  getAllTransactions,
  deleteTransaction,
  updateTransaction,
  filterTransactions,
  searchTransactions,
  categorySummary,
  exportCSV
} = require("../controllers/transactionController");

// Add transaction
router.post("/add",auth, addTransaction);


// Get all
router.get("/all",auth, getAllTransactions);


// Delete
router.delete("/delete/:id", auth, deleteTransaction);


// Update
router.put("/update/:id", auth, updateTransaction);


// Filter by date
router.get("/filter", auth, filterTransactions);



// Search
router.get("/search", auth, searchTransactions);


// Category summary
router.get("/category-summary", auth, categorySummary);


// Export CSV
router.get("/export-csv", auth, exportCSV);

module.exports = router;


