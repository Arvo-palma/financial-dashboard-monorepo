const User = require("../models/User");
const jwt = require("jsonwebtoken");
const util = require("util");

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
      const email: string = req.body.email;
      const password: string = req.body.password;

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

  protect: async (req, res, next) => {
    try {
      // Checking if user has a token
      const bearerToken = req.headers.authorization;

      let token: string;
      if (bearerToken && bearerToken.startsWith("bearer")) {
        token = bearerToken.split(" ")[1];
      }
      if (!token) {
        throw new Error("You are not logged in!");
      }
      // Validating user token
      const decodedToken = await util.promisify(jwt.verify)(
        token,
        process.env.SECRET
      );
      // Check if user exists
      const user = await User.findById(decodedToken.id);
      if (!user) {
        throw new Error("The user with given token does not exist!");
      }
      // Check if user changed credentials
      const isCredentialsChanged: boolean = await user.isCredentialsChanged(
        decodedToken.iat
      );
      if (isCredentialsChanged) {
        throw new Error(
          "The user of this token changed the credentials, please login again"
        );
      }
      // Allow user to access router
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({
        status: "fail",
        message: error.message,
      });
    }
  },
};

module.exports = authController;
