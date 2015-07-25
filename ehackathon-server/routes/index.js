var express = require('express');
var router = express.Router();
var ensureAuthenticated = require('../middleware/ensureAuthenticated');
/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res, next) {
  console.log(req.user);
  res.render('index', { title: 'eHackathon', user: req.user });
});

module.exports = router;
