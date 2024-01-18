const router = require("express").Router();
const authController = require("../controllers/authController.ts");

// For project future updates:
// router.route("/signup").post((req, res) => authController.signup(req, res));

router.route("/login").post((req, res) => authController.login(req, res));

module.exports = router;
