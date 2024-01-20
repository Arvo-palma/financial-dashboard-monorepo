const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: [true, "Please enter an email."],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a password."],
      select: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  // encrypt password before save
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

userSchema.methods.checkPassword = async function (
  password: string,
  dbPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, dbPassword);
};

userSchema.methods.isCredentialsChanged = async function (
  JWTTimestamp: number
): Promise<boolean> {
  if (this.updatedAt) {
    const lastUpdateInMiliseconds = Math.ceil(this.updatedAt.getTime() / 1000);

    return JWTTimestamp < lastUpdateInMiliseconds;
  }
  return false;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
