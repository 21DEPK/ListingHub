const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, listingValidator } = require("../middlewares.js");
const listingControllers = require("../controllers/listing.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });
router.get("/search", wrapAsync(listingControllers.search));
router.get("/filters/:value", wrapAsync(listingControllers.filter));

router
  .route("/")
  .get(wrapAsync(listingControllers.home))
  .post(
    upload.single("listing[image]"),
    isLoggedIn,
    listingValidator,
    wrapAsync(listingControllers.create)
  );

router.get("/new", isLoggedIn, listingControllers.renderNewListingForm);

router
  .route("/:id")
  .get(wrapAsync(listingControllers.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    listingValidator,
    wrapAsync(listingControllers.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingControllers.deleteListing));

router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingControllers.editForm)
);

module.exports = router;
