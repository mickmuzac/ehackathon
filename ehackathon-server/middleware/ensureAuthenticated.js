function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/auth/reddit');
}

module.exports = ensureAuthenticated;