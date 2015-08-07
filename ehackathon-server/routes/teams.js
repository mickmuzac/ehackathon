var express = require('express');
var router = express.Router();
var ensureAuthenticated = require('../middleware/ensureAuthenticated');
var dal = require('../models/dal');

router.get('/', ensureAuthenticated, function(req, res, next) {
  res.render('teams', {
    title: 'Teams'
  });
});

router.get('/create', ensureAuthenticated, function(req, res, next) {
  res.render('teams_create', {
    user: req.user
  })
})

router.post('/create', ensureAuthenticated, function(req, res, next) {
  //TODO: Validation and stuff
  dal.getLatestEvent(function(err, doc) {
    var team = {
      ownerId: req.user._id,
      title: req.body.title,
      description: req.body.description,
      eventId: doc._id
    };
    dal.findOrCreateTeam(team, function(err, doc, created) {
      if(created) {
        res.render('teams_created', {
          team: doc
        });
      } else {
        res.render('error',{
          message: 'You\'ve already created a team!',
          error: {
            status: 409,
            stack: ''
          }
        });
      }
      
    })
  })
});

module.exports = router;
