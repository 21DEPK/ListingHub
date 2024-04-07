const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, listingValidator } = require("../middlewares.js");
const listingControllers = require("../controllers/listing.js");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router
  .route("/")
  .get(wrapAsync(listingControllers.home))
  .post(upload.single("listing[image]"), (req, res) => {
    res.send({ file: req.file, otherFields: req.body });
  });
// .post(isLoggedIn, listingValidator, wrapAsync(listingControllers.create));
// isLoggedIn,
router.get("/new", listingControllers.renderNewListingForm);

router
  .route("/:id")
  .get(wrapAsync(listingControllers.showListing))
  .put(isLoggedIn, isOwner, wrapAsync(listingControllers.updateListing))
  .delete(isLoggedIn, isOwner, wrapAsync(listingControllers.deleteListing));

router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingControllers.editForm)
);

module.exports = router;
