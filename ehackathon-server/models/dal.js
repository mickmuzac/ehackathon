//data abstraction layer api... if the database is ever swapped, then this should be
//the only file needing an update
var mongoose = require('mongoose');
var models = require('./index');

//Declare models for use later
var User;
var Event;
var Team;

var dbUrl = process.env.MONGOHQ_URL || 'mongodb://@127.0.0.1:27017/ehackathon';

//Connect to the database, init models on success
var connection = mongoose.createConnection(dbUrl);
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function () {
  console.info('Connected to database');
  User = connection.model('User', models.User, 'users');
  Event = connection.model('Event', models.Event, 'events');
  Team = connection.model('Team', models.Team, 'teams');
});

exports.addUserToLatestEvent = function(user, cb){
  //async.js would be pretty nice here.. heh.
  var username = user.username;
  exports.getLatestEvent(function(err, doc){
    if(!err){
      User.update({ 'username': username }, { '$push': { 'events':  doc._id } }, function(err){
        cb(err);
      });
    } else cb(err);
  });

}

exports.getLatestEvent = function(cb){
  console.log("Called within getLatestEvent function");
  Event.findOne({}, {}, { sort : { created: -1 } }, cb);
}

exports.findOrCreateUser = function(username, cb){
  User.findOrCreate({ 'username': username }, cb);
}

exports.findOrCreateTeam = function(team, cb) {
  Team.findOrCreate({ ownerId: team.ownerId, eventId: team.eventId }, team, cb);
}