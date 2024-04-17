const mongoose = require("mongoose");
require("dotenv").config();
const MONGO_URL = process.env.MONGO_URL;

async function main() {
  await mongoose.connect(MONGO_URL);
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
