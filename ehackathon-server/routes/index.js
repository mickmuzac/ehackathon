var express = require('express');
var router = express.Router();
var dal = require('../models/dal');
/* GET home page. */

router.get('/', function(req, res, next) {
  if(req.user) {
    console.log(req.user._id);
    dal.findTeamsByMemberId(req.user._id, function(err, docs) {
      console.log(docs);
      res.render('index', { user: req.user, team: docs[0] ? docs[0] : {} });
    });
  } else {
    res.render('index', { user: {}, team: {} });
  }
  
});

module.exports = router;
