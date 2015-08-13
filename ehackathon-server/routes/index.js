var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  req.user = req.user ? req.user : {};
  res.render('index', { user: req.user });
});

module.exports = router;
