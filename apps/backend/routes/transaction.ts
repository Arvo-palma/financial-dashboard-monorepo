const router = require("express").Router();
const transactionController = require("../controllers/transactionController.ts");
const authController = require("../controllers/authController");

router
  .route("/transactions")
  .get(authController.protect, transactionController.getAll);

// For project future updates:
// router
//   .route("/transactions")
//   .post(transactionController.create);

module.exports = router;
