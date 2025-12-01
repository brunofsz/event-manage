const mongoose = require("mongoose");

async function main() {
  console.log("Connecting to DB...");

  try {
    mongoose.set("strictQuery", true);

    await mongoose.connect(process.env.MONGO_URI);

    console.log("DB connected");
  } catch (error) {
    console.log("Erro:", error);
  }
}

module.exports = main;
