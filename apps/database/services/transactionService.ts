const Transaction = require("../models/Transaction.ts");

const queryFilterToMongoDBFilter = (query) => {
  let queryStr = JSON.stringify(query);
  let isMultiOption = false;
  const newQueryStr = queryStr.replace(
    /\b(gte|gt|lte|lt|ne|in)\b/g,
    (match) => {
      if (match === "in") {
        isMultiOption = true;
      }
      return `$${match}`;
    }
  );
  const queryObj = JSON.parse(newQueryStr);

  if (isMultiOption) {
    Object.keys(queryObj).map((filter) => {
      if (!!queryObj[filter]["$in"]) {
        const strArray = queryObj[filter]["$in"];
        const arrayOptions = strArray
          .split("[")[1]
          .split("]")[0]
          .split(",")
          .map((option) => option.replace(/'/g, "").replace(" ", ""));
        queryObj[filter]["$in"] = arrayOptions;
      }
    });
  }

  return queryObj;
};

const calculateIncome = (transactions) => {
  const income = transactions.reduce(
    (acc, transaction) =>
      transaction.transaction_type === "deposit"
        ? acc + parseInt(transaction.amount)
        : acc,
    0
  );
  return income;
};

const calculateExpenses = (transactions) => {
  const expenses = transactions.reduce(
    (acc, transaction) =>
      transaction.transaction_type === "withdraw"
        ? acc + parseInt(transaction.amount)
        : acc,
    0
  );
  return expenses;
};

const calculatePendingTransactions = (transactions) => {
  const now = new Date().getTime() / 1000;

  const pendingValue = transactions.reduce(
    (acc, transaction) =>
      transaction.date <= now
        ? transaction.transaction_type === "deposit"
          ? acc + parseInt(transaction.amount)
          : acc - parseInt(transaction.amount)
        : acc,
    0
  );
  return pendingValue;
};

const transactionService = async (req) => {
  const { query } = req;
  const queryObj = queryFilterToMongoDBFilter(query);

  const transactions = await Transaction.find(queryObj);

  const income = calculateIncome(transactions);

  const expenses = calculateExpenses(transactions);

  const pendingTransactions = calculatePendingTransactions(transactions);

  const periodBalance = income - expenses;

  return { transactions, income, expenses, pendingTransactions, periodBalance };
};

module.exports = transactionService;
