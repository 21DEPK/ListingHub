const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const User = require("../models/User");
const passport = require("passport");

router.get("/signup", (req, res) => {
  res.render("users/new");
});

router.post("/signup", async (req, res) => {
  try {
    let { username, email, password } = req.body.user;
    let newUser = new User({ email, username });
    await User.register(newUser, password);
    req.flash(
      "success",
      "User Successfully Registered! Welcome to Wanderlust" +
        ` ${password}  ${username}`
    );
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
  passport.authenticate("local", {
    failureRedirect: "/users/login",
    failureFlash: true,
  }),
  async (req, res) => {
    let { username, password } = req.body.user;
    req.flash("success", `${username} Welcome! to Wanderlust`);
    res.render("home");
  }
);
module.exports = router;
