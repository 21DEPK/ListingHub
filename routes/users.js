const express = require("express");
const router = express.Router();
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares");
const userControllers = require("../controllers/user.js");

router
  .route("/signup")
  .get(userControllers.serveSignupForm)
  .post(userControllers.signup);

router
  .route("/login")
  .get(userControllers.serveLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/users/login",
      failureFlash: true,
    }),
    userControllers.login
  );

router.get("/logout", userControllers.logout);

module.exports = router;
