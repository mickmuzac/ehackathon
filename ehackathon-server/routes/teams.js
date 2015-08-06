var express = require('express');
var router = express.Router();
var ensureAuthenticated = require('../middleware/ensureAuthenticated');
var db = require('../middleware/db');

router.get('/', ensureAuthenticated, function(req, res, next) {
  res.send(403);
  // res.render('profile', {
  //   user: req.user
  // });
});

router.post('/', ensureAuthenticated, db, function(req, res, next) {
  //add some validation
  //db.Teams.create still need team model
});

module.exports = router;
