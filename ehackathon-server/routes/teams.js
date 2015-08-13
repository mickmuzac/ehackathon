var express = require('express');
var router = express.Router();
var ensureAuthenticated = require('../middleware/ensureAuthenticated');
var dal = require('../models/dal');

router.get('/', ensureAuthenticated, function(req, res, next) {
  dal.findTeamsByMemberId(req.user._id, function(err, doc){
    res.render('teams', {
      title: 'Teams',
      teams: doc
    });
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

router.get('/invite/code', ensureAuthenticated, function(req, res, next) {
  var team = dal.findTeamByOwnerId(req.user._id, function(err, doc) {
    if(doc !== null) {
      dal.createTeamInvite(doc._id, function(err, doc) {
        if(doc !== null) {
          res.send(200, doc);
        } else {
          res.send(400);
        }
      })
    } else {
      res.send(403);
    }
  })
});

router.get('/invite/redeem/:codeId', ensureAuthenticated, function(req, res, next) {
  //TODO: Add validation(does user already belong to/own team etc..., clean up the nestedness
  var code = dal.findInviteById(req.query.codeId, function(err, doc) {
    if(err === null && doc !== null) {

      dal.addUserToTeam(doc.teamId, req.user._id, function(err, doc) {
        if(err === null) {
          dal.deleteTeamInvite(req.query.codeId, function(err) {
            if(err === null) {
              res.redirect('/teams');
            } else {
              res.render('error', {
                error: err
              });
            }
          })
        } else {
          res.render('error', {
            error: err
          });
        }

      })
    } else {
      res.render('error',{
        message: 'No code here :(',
        error: {
          status: 404,
          stack: ''
        }
      });
    }
  })
})

module.exports = router;
