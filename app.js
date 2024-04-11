require("./utils/dbConnection.js")();
require("dotenv").config();
const express = require("express"),
  path = require("path"),
  ejsMate = require("ejs-mate"),
  methodOverride = require("method-override"),
  expressError = require("./utils/customError.js"),
  cookie_parser = require("cookie-parser");
const User = require("./models/user");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const flash = require("connect-flash");
const LocalStrategy = require("passport-local").Strategy;
const listingRoutes = require("./routes/listings.js"), //requiring routes
  reviewRoutes = require("./routes/reviews.js"),
  userRoutes = require("./routes/users.js");
const app = express();

app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "/views"));
const sessionOptions = {
  secret: process.env.SECRET,
  resave: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    crypto: {
      secret: process.env.SECRET,
    },
    touchAfter: 24 * 60 * 60,
  }),
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 24 * 60 * 60 * 1000,
    maxAge: 24 * 60 * 60 * 1000,
  },
};

// Using middlewares
app.use(methodOverride("_method")); // used for put patch or delete requests
app.use(cookie_parser("mySecretKey"));
app.use(express.urlencoded({ extended: true })); // encoding the form data
app.use(express.json()); // parsing the json data from form
app.use(express.static(path.join(__dirname, "/public"))); // serving static files from public directory
app.use(flash()); // using flash middleware
app.use(session(sessionOptions)); // session middleware
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  if (!res.locals.loggedIn) {
    res.locals.currentUser = req.user;
  }
  next();
});
passport.use(new LocalStrategy(User.authenticate())); // authenticating with local strategy
passport.serializeUser(User.serializeUser()); // serializing the user to be stored in sessions
passport.deserializeUser(User.deserializeUser()); // deserializing the user to be removed from sessions

// index route
app.get("/", (req, res) => {
  res.redirect("/listings");
});

// routes
app.use("/listings", listingRoutes); // listing routes
app.use("/listings/:listingId/reviews", reviewRoutes); // reviews routes
app.use("/users", userRoutes); // users routes

// page not found
app.all("*", (req, res, next) => {
  next(new expressError(404, "Page Not Found"));
});
// express error
app.use((err, req, res, next) => {
  let { statusCode, message } = err;
  res.render("ERROR", { statusCode, message });
});

// server listening
app.listen(8080, () => {
  console.log("server is listening to port 8080");
});
