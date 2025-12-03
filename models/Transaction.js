// importing mongoose to create a database schema
const mongoose = require("mongoose");

// creating the structure (schema) for a transaction
const transactionSchema = new mongoose.Schema(
  {
    // the user who added this transaction (linked to User collection)
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // transaction type must be either income or expense
    type: { type: String, enum: ["income", "expense"], required: true },

    // amount of the transaction
    amount: { type: Number, required: true },

    // category like food, salary, travel, etc.
    category: { type: String, required: true },

    // date of the transaction (default is today)
    date: { 
      type: Date,
      default: Date.now
    },

    // optional description entered by the user
    description: { type: String }
  },

  {
    // automatically adds createdAt and updatedAt fields
    timestamps: true,

    // customizing the JSON output sent to frontend
    toJSON: {
      transform(doc, ret) {
        // removing default fields that we don't want to show in API response
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.__v;

        // converting time to Indian Standard Time for easy readability
        ret.createdAtIST = new Date(doc.createdAt).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata"
        });
        ret.updatedAtIST = new Date(doc.updatedAt).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata"
        });

        return ret;
      }
    }
  }
);

// exporting this model so we can use it in controllers
module.exports = mongoose.model("Transaction", transactionSchema);
