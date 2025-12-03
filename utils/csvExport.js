const { Parser } = require("json2csv");
const Transaction = require("../models/Transaction");

async function exportToCSV(res, userId) {
  try {
    // fetch transactions for the user
    const transactions = await Transaction.find({ userId });

    if (transactions.length === 0) {
      return res.status(404).send("No transactions found");
    }

    // convert transactions to plain JS objects
    const transactionsData = transactions.map(tx => ({
      type: tx.type,
      amount: tx.amount,
      category: tx.category,
      description: tx.description,
      date: tx.date,
    }));

    // convert JSON to CSV
    const parser = new Parser({ fields: ["type", "amount", "category", "description", "date"] });
    const csv = parser.parse(transactionsData);

    // set headers to download CSV
    res.setHeader("Content-Type", "text/csv");  
    res.setHeader("Content-Disposition", "attachment; filename=transactions.csv");

    res.send(csv);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = exportToCSV;
