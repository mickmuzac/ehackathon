var models = require('../models');
function db (req, res, next) {
  req.db = {
    User: connection.model('User', models.User, 'users'),
    Post: connection.model('Event', models.Event, 'events')
  };
  return next();
}

module.exports = db;