// importing the transaction model so we can save, update and read transactions from mongodb
const Transaction = require("../models/Transaction");
const mongoose = require("mongoose");


// add a new transaction
exports.addTransaction = async (req, res) => {
  try {
    // this shows the logged-in user coming from auth middleware
    console.log("User from middleware:", req.user);

    // this shows the data sent from frontend
    console.log("Request body:", req.body);

    // if user is not found, token is wrong or missing
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // taking input data from frontend
    const { type, amount, category, description, date } = req.body;

    // creating the new transaction
    const newTx = new Transaction({
      userId: req.user.id, // storing which user added it
      type,
      amount,
      category,
      description,
      date: date ? new Date(date) : new Date() // use given date or today's date
    });

    // saving it in mongodb
    await newTx.save();

    res.json({ message: "Transaction added", transaction: newTx });
  } catch (err) {
    console.error("Add transaction error:", err);
    res.status(500).json({ error: err.message });
  }
};


// get all transactions of the logged-in user
exports.getAllTransactions = async (req, res) => {
  try {
    // get all transactions of that user and sort latest first
    const list = await Transaction.find({ userId: req.user.id }).sort({ date: -1 });

    // calculating total income
    const totalIncome = list
      .filter(t => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    // calculating total expenses
    const totalExpense = list
      .filter(t => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    // balance = income - expense
    const balance = totalIncome - totalExpense;

    res.json({
      transactions: list,
      totalIncome,
      totalExpense,
      balance
    });
  } catch (err) {
    console.error("Get transactions error:", err);
    res.status(500).json({ error: err.message });
  }
};


// delete a transaction
exports.deleteTransaction = async (req, res) => {
  try {
    // delete only if it belongs to the logged-in user
    const deletedTx = await Transaction.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    // if id is wrong or user is not owner
    if (!deletedTx) {
      return res.status(404).json({ message: "Transaction not found or not authorized" });
    }

    res.json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// update a transaction
exports.updateTransaction = async (req, res) => {
  try {
    // update only if it belongs to the logged-in user
    const updatedTx = await Transaction.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true } // return updated data
    );

    if (!updatedTx) {
      return res.status(404).json({ message: "Transaction not found or not authorized" });
    }

    res.json({ message: "Transaction updated", transaction: updatedTx });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// filter transactions by date range
exports.filterTransactions = async (req, res) => {
  try {
    const { start, end } = req.query;

    console.log("Logged user:", req.user?.id);
    console.log("Start:", start, "End:", end);

    // frontend must send both dates
    if (!start || !end) {
      return res.status(400).json({ error: "Start and end dates required" });
    }

    const startDate = new Date(start);
    const endDate = new Date(end);
    endDate.setHours(23, 59, 59, 999); // include full end day

    const userId = req.user.id;

    // find transactions within the given date range
    const transactions = await Transaction.find({
      userId: userId,
      date: { $gte: startDate, $lte: endDate }
    });

    console.log("Found:", transactions.length);

    res.json(transactions);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


// search transactions by description text
exports.searchTransactions = async (req, res) => {
  try {
    let search = (req.query.q || "").trim(); // always sanitize and trim

    const userId = req.user.id;

    console.log("Logged in user:", userId);
    console.log("Search query:", search);

    // if empty search, return empty list
    if (search === "") {
      return res.json([]);
    }

    // use regex for partial, case-insensitive search
    const transactions = await Transaction.find({
      userId: userId,
      description: { $regex: new RegExp(search, "i") }
    });

    console.log("Transactions found:", transactions.length);
    res.json(transactions);

  } catch (error) {
    console.error("Search Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// group transactions by category
exports.categorySummary = async (req, res) => {
  try {
    // if user missing, token issue
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // convert string id to object id for aggregation
    const userId = new mongoose.Types.ObjectId(req.user.id);

    // mongodb pipeline: match user → group by category → sum amounts
    const data = await Transaction.aggregate([
      { $match: { userId: userId } },
      { $group: { _id: "$category", total: { $sum: "$amount" } } }
    ]);

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


// export transactions as CSV file
const exportToCSV = require("../utils/csvExport");

exports.exportCSV = async (req, res) => {
  try {
    // utility function handles everything
    await exportToCSV(res, req.user.id);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
