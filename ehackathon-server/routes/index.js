var express = require('express');
var router = express.Router();
var dal = require('../models/dal');
/* GET home page. */

router.get('/', function(req, res, next) {
  if(req.user) {
    dal.findTeamsByMemberId(req.user._id, function(err, docs) {
      var team = docs[0] ? docs[0] : {};
      if(team.title) {
        dal.findTeamMembers(docs[0]._id, function(err, docs) {
          res.render('index', { user: req.user, team: team, teamMembers: docs });
        });
      } else {
        res.render('index', { user: req.user, team: team, teamMembers: {} });
      }
      
    });
  } else {
    res.render('index', { user: {}, team: {}, teamMembers: {} });
  }
});

module.exports = router;
