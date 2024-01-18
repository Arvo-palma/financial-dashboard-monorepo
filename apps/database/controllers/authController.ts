const User = require("../models/User");
const jwt = require("jsonwebtoken");

const authController = {
  // For project future updates
  // signup: async (req, res, next) => {
  //   try {
  //     const userData = req.body;
  //     const newUser = await User.create(userData);
  //     res
  //       .status(201)
  //       .json({ message: "User created", data: { user: newUser } });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },

  login: async (req, res, next) => {
    try {
      const email = req.body.email;
      const password = req.body.password;

      // check if request data is complete
      if (!email || !password) {
        throw new Error("Please provide email and password for login in!");
      }

      // check user email
      const user = await User.findOne({ email }).select("+password");

      //check credentials
      if (!user || !(await user.checkPassword(password, user.password))) {
        throw new Error("Invalid email or password!");
      }

      //creates token
      const token = jwt.sign({ id: user.id }, process.env.SECRET, {
        expiresIn: process.env.LOGIN_EXPIRES,
      });

      res.status(200).json({ message: "Logged in!", token });
    } catch (error) {
      res.status(404).json({
        status: "fail",
        message: error.message,
      });
    }
  },
};

module.exports = authController;
