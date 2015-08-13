var express = require('express');
var router = express.Router();
var ensureAuthenticated = require('../middleware/ensureAuthenticated');
var dal = require('../models/dal');

router.get('/', ensureAuthenticated, function(req, res, next) {
  dal.findTeamsByMemberId(req.user._id, function(err, doc){
    res.render('teams', {
      title: 'Teams'
    });
  });
});

module.exports = router;
