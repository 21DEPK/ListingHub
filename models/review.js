const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  description: String,
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
