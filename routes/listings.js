const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// home route
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const data = await Listing.find({});
    // let sortedData = data.sort((a, b) => a.price - b.price);
    res.render("listings/home", { data });
  })
);

//New Route
router.get("/new", (req, res) => {
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
  wrapAsync(async (req, res) => {
    try {
      const newListing = new Listing(req.body.listing);
      await newListing.save();
    } catch (err) {
      console.log("Error --> ", err._message);
    }
    res.redirect("/");
  })
);

//Edit Route
router.get(
  "/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit", { listing });
  })
);

//Update Route
router.put(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
  })
);

//Delete Route
router.delete(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/");
  })
);

module.exports = router;
