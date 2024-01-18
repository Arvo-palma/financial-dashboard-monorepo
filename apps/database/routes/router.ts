const router = require("express").Router();
const transactionRouter = require("./transaction.ts");
const authRouter = require("./auth.ts");

router.use("/", transactionRouter);
router.use("/", authRouter);

module.exports = router;
