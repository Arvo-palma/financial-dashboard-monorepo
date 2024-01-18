const router = require("express").Router();
const transactionController = require("../controllers/transactionController.ts");

router
  .route("/transactions")
  .get((req, res) => transactionController.getAll(req, res));

// For project future updates:
// router
//   .route("/transactions")
//   .post((req, res) => transactionController.create(req, res));

module.exports = router;
