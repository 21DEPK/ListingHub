const express = require("express");
const router = express.Router({ mergeParams: true });
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");

// Create reviews route
router.post(
  "/",
  wrapAsync(async (req, res) => {
    let { listingId } = req.params;
    let newReview = new Review(req.body.reviews);
    let listing = await Listing.findById(listingId);
    listing.listingReviews.push(newReview);

    await newReview.save();
    await listing.save();
    res.redirect(`/listings/${listingId}`);
  })
);

// delete review route
router.delete("/:reviewId", async (req, res) => {
  let { listingId, reviewId } = req.params;
  await Listing.findByIdAndUpdate(listingId, {
    $pull: { listingReviews: reviewId },
  });
  await Review.findByIdAndDelete(reviewId);
  res.redirect(`/listings/${listingId}`);
});

module.exports = router;
