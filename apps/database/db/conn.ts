const mongoose = require("mongoose");

async function main() {
  try {
    mongoose.set("strictQuery", true);

    await mongoose.connect(process.env.ATLAS_URI);

    console.log("Connected to database");
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

module.exports = main;
