var express = require('express');
var crypto = require('crypto');

module.exports = function(passport) {
  var router = express.Router();
  router.get('/reddit', function(req, res, next) {
    req.session.state = crypto.randomBytes(32).toString('hex');
    passport.authenticate('reddit', {
      state: req.session.state,
    })(req, res, next);
  });

  router.get('/reddit/callback', function(req, res, next) {
    // Check for origin via state token
    if (req.query.state == req.session.state) {
      passport.authenticate('reddit', {
        successRedirect: '/profile',
        failureRedirect: '/error'
      })(req, res, next);
    } else {
      next(new Error(403));
    }
  });
  return router;
}
