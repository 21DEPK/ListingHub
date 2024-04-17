const mongoose = require("mongoose");
require("dotenv").config();
const MONGO_URL = process.env.MONGO_URL;

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust" || MONGO_URL);
}

module.exports = () => {
  main()
    .then(() => {
      console.log("connected to DB");
    })
    .catch((err) => {
      console.log(err);
    });
};
