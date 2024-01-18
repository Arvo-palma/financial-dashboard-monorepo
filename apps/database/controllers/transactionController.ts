const Transaction = require("../models/Transaction.ts");

const transactionController = {
  getAll: async (req, res) => {
    try {
      const { query } = req;
      let queryStr = JSON.stringify(query);
      const newQueryStr = queryStr.replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`
      );
      const queryObj = JSON.parse(newQueryStr);

      const transactions = await Transaction.find(queryObj);

      res.json(transactions);
    } catch (error) {
      res.status(404).json({
        status: "fail",
        message: error.message,
      });
    }
  },

  // For project future updates:
  // create: async (req, res) => {
  //   try {
  //     const transaction = {
  //       date: req.body.date,
  //       amount: req.body.amount,
  //       transaction_type: req.body.transaction_type,
  //       currency: req.body.currency,
  //       account: req.body.account,
  //       industry: req.body.industry,
  //       state: req.body.state,
  //     };

  //     const response = await Transaction.create(transaction);

  //     res
  //       .status(201)
  //       .json({ response, message: "Transaction created succesfully!" });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
};

module.exports = transactionController;
