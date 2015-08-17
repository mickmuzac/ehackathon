function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  else{
    console.log(req.originalUrl, "saved in session");
    req.session.redirect = req.originalUrl;
    res.redirect('/auth/reddit');
  }
}

module.exports = ensureAuthenticated;
