const mongoose = require("mongoose");

async function main() {
  console.log("Connecting to DB...");

  try {
    mongoose.set("strictQuery", true);

    await mongoose.connect(
      "mongodb+srv://bruno:hjXqyQMFEnaEM6Gw@cluster0.udpefpj.mongodb.net/?appName=Cluster0"
    );

    console.log("DB connected");
  } catch (error) {
    console.log("Erro:", error);
  }
}

module.exports = main;
