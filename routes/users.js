const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares");

router.get("/signup", (req, res) => {
  res.render("users/new");
});

router.post("/signup", async (req, res) => {
  try {
    let { username, email, password } = req.body.user;
    let newUser = new User({ email, username });
    let registerUser = await User.register(newUser, password);
    req.login(registerUser, (err) => {
      if (err) {
        return next(err);
      }
    });
    req.flash("success", "User Successfully Registered! Welcome to Wanderlust");
    res.redirect("/listings");
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/users");
  }
});

router.get("/login", (req, res) => {
  res.render("users/login");
});

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/users/login",
    failureFlash: true,
  }),
  async (req, res) => {
    let { username } = req.body;
    req.flash("success", `${username} Welcome! to Wanderlust`);
    res.locals.loggedIn = username;
    res.redirect(
      301,
      res.locals.redirectUrl ? res.locals.redirectUrl : "/listings"
    );
  }
);

router.get("/logout", (req, res) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "Logout Successfully!");
    res.redirect("/listings");
  });
});
module.exports = router;
