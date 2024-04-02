require("./utils/dbConnection.js")();
const express = require("express"),
  path = require("path"),
  ejsMate = require("ejs-mate"),
  methodOverride = require("method-override"),
  expressError = require("./utils/customError.js"),
  cookie_parser = require("cookie-parser");

// requiring routes
const listingRoutes = require("./routes/listings.js"),
  reviewRoutes = require("./routes/reviews.js");
const app = express();

// {listingSchema,reviewSchema} = require("./schema.js");

// function listingValidator(req,res,next){

// }
// function reviewsValidator(req,res,next){

// }

app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "/views"));

// Using middlewares
app.use(methodOverride("_method"));
app.use(cookie_parser("mySecretKey"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

// index route
app.get("/", (req, res) => {
  res.redirect("/listings");
});
// listing routes
app.use("/listings", listingRoutes);
// reviews routes
app.use("/listings/:listingId/reviews", reviewRoutes);

// page not found
app.all("*", (req, res, next) => {
  next(new expressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
  let { statusCode, message } = err;
  res.status(404).send(message);
});

app.listen(8080, () => {
  console.log("server is listening to port 8080");
});
