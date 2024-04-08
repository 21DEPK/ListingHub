const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
  await mongoose.connect(MONGO_URL);
}

let modifiedData = initData.map((listing) => {
  return { ...listing, owner: "6611640752970d0ed0e48848" };
});
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

const initDB = async () => {
  try {
    await Listing.deleteMany({}); // empty the database
    await Listing.insertMany(modifiedData);
    console.log("data was initialized");
  } catch (e) {
    console.log("Error during initializing database --> ", e._message);
  }
};

initDB();

// convert data.js to data.json

// const data = require("./data.js");
// const fs = require("fs");

// let modifiedData = data.map((listing) => {
//   return { ...listing, owner: "6611640752970d0ed0e48848" };
// });

// let jsonData = JSON.stringify(modifiedData);

// fs.writeFile("data.json", `${jsonData}`, function (err) {
//   if (err) throw err;
//   console.log("Saved!");
// });

// cloud mongodb connection

// const { MongoClient } = require("mongodb");
// const fs = require("fs");
// const uri =
//   "mongodb+srv://deepak2121:deepak%40mongodbatlas@wanderlust.7z36mye.mongodb.net/?retryWrites=true&w=majority&appName=WanderLust";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri);

// async function run() {
//   try {
//     const database = client.db("wanderlust").collection("listings");
//     const query = { price: { $gt: 1700 } };
//     const result = await database.findOne(query);
//     console.log(result);
//   } finally {
//     await client.close();
//   }
// }
// run().catch(console.dir);
