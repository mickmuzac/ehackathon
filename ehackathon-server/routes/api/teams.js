var express = require('express');
var router = express.Router();
var ensureAuthenticated = require('../../middleware/ensureAuthenticated');
var dal = require('../../models/dal');
var env = process.env.NODE_ENV || 'development';
var config = require('../../config/config.json')[env];

router.get('/teams', ensureAuthenticated, function(req, res, next) {
  dal.findTeamsByMemberId(req.user._id, function(err, doc){
    if(err) res.send(500);
    else{
      if(doc) res.send(200, doc);
      else res.send(404);
    }
  });
});

router.post('/teams/create', ensureAuthenticated, function(req, res, next) {
  //TODO: Validation and stuff
  dal.getLatestEvent(function(err, doc) {
    if(err) return res.send(500);

    var team = {
      ownerId: req.user._id,
      title: req.body.title,
      description: req.body.description,
      email: req.body.email,
      eventId: doc._id
    };
    dal.findOrCreateTeam(team, function(err, doc, created) {
      if(err) res.send(500);
      else if(created) {
        res.send(200, doc);
      }
      else {
        //Team was already created
        res.send(409);
      }
    })
  })
});

router.delete('/teams/:id', ensureAuthenticated, function(req, res, next) {
  dal.findTeamByOwnerId(req.user._id, function(err, doc) {
    if(err) res.send(500);
    else if(!doc || doc._id != req.params.id) res.send(403);
    else {
      dal.deleteTeamInvitesByTeamId(doc._id, function(err) {
        if(err) res.send(500);
        else {
            dal.deleteTeam(doc._id, function(err) {
            if(err) res.send(500);
            else res.send(204);
          });
        }
      });
    }
  });
});

router.delete('/teams/leave/:teamId', ensureAuthenticated, function(req, res, next) {
  dal.findTeamsByMemberId(req.user._id, function(err, docs) {
    var doc = docs[0];

    if(err) res.send(500);
    else if(!doc || doc._id != req.params.teamId) res.send(403);
    else {
      dal.removeUserFromTeam(doc._id, req.user._id, function(err) {
        if(err) res.send(500);
        else res.send(204);
      });
    }
  });
});

router.get('/teams/invite/code', ensureAuthenticated, function(req, res, next) {
  var team = dal.findTeamByOwnerId(req.user._id, function(err, doc) {
    if(doc !== null) {
      dal.createTeamInvite(doc._id, function(err, doc) {
        if(doc !== null) {
          res.send(200, { inviteUrl: config.baseUrl + '/teams/invite/redeem/' + doc._id });
        } else {
          res.send(400);
        }
      })
    } else {
      res.send(403);
    }
  })
});

router.get('/teams/invite/redeem/:codeId', ensureAuthenticated, function(req, res, next) {
  //TODO: Add validation(does user already belong to/own team etc..., clean up the nestedness
  var code = dal.findInviteById(req.query.codeId, function(err, doc) {
    if(err === null && doc !== null) {

      dal.addUserToTeam(doc.teamId, req.user._id, function(err, doc) {
        if(err === null) {
          dal.deleteTeamInvite(req.query.codeId, function(err) {
            if(err === null) {
              res.redirect('/');
            } else {
              res.send(500, err);
            }
          })
        } else {
          res.send(500, err);
        }

      })
    } else {
      res.send(404);
    }
  })
})


module.exports = router;
