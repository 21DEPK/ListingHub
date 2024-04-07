const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createReview = async (req, res) => {
  let listingId = req.originalUrl.split("/")[2];
  let newReview = new Review({ ...req.body.reviews, createdBy: req.user._id });
  let listing = await Listing.findById(listingId);
  listing.listingReviews.push(newReview);
  await newReview.save();
  await listing.save();
  req.flash("success", "New Review Created!");
  res.redirect(`/listings/${listingId}`);
};

module.exports.deleteReview = async (req, res) => {
  let listingId = req.originalUrl.split("/")[2];
  let { reviewId } = req.params;
  await Listing.findByIdAndUpdate(listingId, {
    $pull: { listingReviews: reviewId },
  });
  await Review.findByIdAndDelete(reviewId);
  req.flash("error", "Review Deleted!");
  res.redirect(`/listings/${listingId}`);
};
