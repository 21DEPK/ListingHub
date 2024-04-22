const mongoose = require("mongoose");
require("dotenv").config();
const MONGO_URL = process.env.MONGO_URL;
const LOCAL_PC = process.env.LOCAL_PC;

async function main() {
  if (LOCAL_PC) {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
    console.log("Local MongoDB Server Connected.");
  } else {
    await mongoose.connect(MONGO_URL);
    console.log("Cloud MongoDB Server Connected.");
  }
}

module.exports = () => {
  main().catch((err) => {
    console.log(err);
  });
};
