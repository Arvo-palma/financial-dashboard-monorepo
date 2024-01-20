const mongoose = require("mongoose");

const { Schema } = mongoose;

const transactionSchema = new Schema(
  {
    date: {
      type: Number,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    transaction_type: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    account: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
