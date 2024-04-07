const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {
  isLoggedIn,
  isReviewCreator,
  reviewValidator,
} = require("../middlewares.js");
const reviewControllers = require("../controllers/review.js");

// Create reviews route
router.post(
  "/",
  isLoggedIn,
  reviewValidator,
  wrapAsync(reviewControllers.createReview)
);

// delete review route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewCreator,
  reviewControllers.deleteReview
);

module.exports = router;
