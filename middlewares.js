const Listing = require("./models/listing");
const Review = require("./models/review");
const customError = require("./utils/customError.js");
const { listingSchema, reviewSchema } = require("./schema.js");

function isLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "Logged In required!");
    return res.redirect("/users/login");
  }
  next();
}

function saveRedirectUrl(req, res, next) {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
}

async function isOwner(req, res, next) {
  let { id } = req.params;
  let result = await Listing.findById(id).populate("owner");
  if (res.locals.currentUser.username !== result.owner.username) {
    req.flash(
      "error",
      `${res.locals.currentUser.username}, you don't own this listing`
    );
    // return res.status(401);
    return res.redirect(`/listings/${id}`);
  }
  next();
}

async function isReviewCreator(req, res, next) {
  let { reviewId } = req.params;
  let result = await Review.findById(reviewId).populate({
    path: "createdBy",
  });
  if (!result.createdBy._id.equals(res.locals.currentUser._id)) {
    console.log("if");
    req.flash("error", "Unauthorized  to perform this action.");
    return res.status(401);
  }
  next();
}

function listingValidator(req, res, next) {
  let result = listingSchema.validate(req.body);
  if (result.error) {
    throw new customError(400, result.error);
  }
  next();
}

function reviewValidator(req, res, next) {
  let result = reviewSchema.validate(req.body);
  if (result.error) {
    throw new customError(400, result.error);
  }
  next();
}

module.exports = {
  isLoggedIn,
  saveRedirectUrl,
  isOwner,
  isReviewCreator,
  listingValidator,
  reviewValidator,
};
