function isLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    req.flash("error", "Logged In must required  to add new listing");
    return res.redirect("/users/login");
  }
  next();
}

module.exports = { isLoggedIn };
