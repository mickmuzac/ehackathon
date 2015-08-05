var express = require('express');
var router = express.Router();
var ensureAuthenticated = require('../middleware/ensureAuthenticated');
var models = require('../models');

router.get('/', ensureAuthenticated, function(req, res, next) {
  res.send(403);
  // res.render('profile', {
  //   user: req.user
  // });
});

router.post('/', ensureAuthenticated, function(req, res, next) {
  //add some validation
  models.Team.create({
    name: req.body.name,
    EventId: req.body.eventId,
    owner: req.user.id
  }).then(function(team) {
    //add some error handling
    res.send(200);
  })
});

module.exports = router;
