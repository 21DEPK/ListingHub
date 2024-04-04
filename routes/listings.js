const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const { isLoggedIn } = require("../middlewares.js");

// home route
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const data = await Listing.find({});
    res.render("listings/home", {
      data,
    });
  })
);

//New Route
router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/new");
});

//Show Route
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("listingReviews");

    res.render("listings/show", { listing });
  })
);

//Create Route
router.post(
  "/",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    try {
      const newListing = new Listing(req.body.listing);
      await newListing.save();
    } catch (err) {
      console.log("Error --> ", err._message);
    }
    req.flash("success", "New Listing Created!");
    res.redirect("/");
  })
);

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit", { listing });
  })
);

//Update Route
router.put(
  "/:id",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
  })
);

//Delete Route
router.delete(
  "/:id",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("error", "Listing Deleted!");
    res.redirect("/");
  })
);

module.exports = router;
