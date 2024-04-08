const Listing = require("../models/listing");

// index
module.exports.home = async (req, res) => {
  const data = await Listing.find({});
  res.render("listings/home", {
    data,
  });
};

// show
module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "listingReviews",
      populate: {
        path: "createdBy",
      },
    })
    .populate("owner");
  res.render("listings/show", { listing });
};

//  new listing form
module.exports.renderNewListingForm = (req, res) => {
  res.render("listings/new", { currentUser: req.user });
};

// create
module.exports.create = async (req, res) => {
  try {
    const newListing = new Listing({
      ...req.body.listing,
      image: {
        filename: req.file.filename,
        url: req.file.path,
      },
      owner: req.user._id,
    });
    await newListing.save();
  } catch (err) {
    console.log("Error --> ", err._message);
  }
  req.flash("success", "New Listing Created!");
  res.redirect("/");
};

// edit form
module.exports.editForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit", { listing });
};

// update
module.exports.updateListing = async (req, res) => {
  let { id } = req.params;

  let result = await Listing.findByIdAndUpdate(id, {
    ...req.body.listing,
  });
  if (req.file) {
    result.image = {
      filename: req.file.filename,
      url: req.file.path,
    };
    await result.save();
  }

  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

// delete
module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("error", "Listing Deleted!");
  res.redirect("/listings");
};
