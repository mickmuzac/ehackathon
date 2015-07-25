var express = require('express');
var router = express.Router();
var ensureAuthenticated = require('../middleware/ensureAuthenticated');

router.get('/', ensureAuthenticated, function(req, res, next) {
  res.render('profile', {
    user: req.user
  });
});

module.exports = router;
