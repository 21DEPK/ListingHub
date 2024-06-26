const User = require("../models/user");

module.exports.serveSignupForm = (req, res) => {
  res.render("users/new");
};

module.exports.signup = async (req, res) => {
  try {
    let { username, email, password } = req.body.user;
    let newUser = new User({ email, username });
    let registerUser = await User.register(newUser, password);
    req.login(registerUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash(
        "success",
        "User Successfully Registered! Welcome to ListingHub"
      );
      res.redirect("/listings");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/users/signup");
  }
};

module.exports.serveLoginForm = (req, res) => {
  res.render("users/login");
};

module.exports.login = async (req, res) => {
  let { username } = req.body;
  req.flash("success", `${username} Welcome back! to ListingHub`);
  res.redirect(
    301,
    res.locals.redirectUrl ? res.locals.redirectUrl : "/listings"
  );
};

module.exports.logout = (req, res) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "Logout Successfully!");
    res.redirect("/listings");
  });
};
