//data abstraction layer api... if the database is ever swapped, then this should be
//the only file needing an update
var mongoose = require('mongoose');
var models = require('./index');

var ObjectId = mongoose.Types.ObjectId;

//Declare models for use later
var User;
var Event;
var Team;
var TeamInvite;

var dbUrl = process.env.MONGOHQ_URL || 'mongodb://@127.0.0.1:27017/ehackathon';

//Connect to the database, init models on success
var connection = mongoose.createConnection(dbUrl);
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function () {
  console.info('Connected to database');
  User = connection.model('User', models.User, 'users');
  Event = connection.model('Event', models.Event, 'events');
  Team = connection.model('Team', models.Team, 'teams');
  TeamInvite = connection.model('TeamInvite', models.TeamInvite, 'teamInvites');
});

exports.addUserToLatestEvent = function(user, cb){
  //async.js would be pretty nice here.. heh.
  var username = user.username;
  exports.getLatestEvent(function(err, doc){
    if(!err){
      User.update({ 'username': username }, { '$addToSet': { 'events':  doc._id } }, function(err){
        cb(err);
      });
    } else cb(err);
  });

}

/*
  Events
*/

exports.getLatestEvent = function(cb){
  console.log("Called within getLatestEvent function");
  Event.findOne({}, {}, { sort : { created: -1 } }, cb);
}

/*
  Users
*/

exports.findOrCreateUser = function(username, cb){
  User.findOrCreate({ 'username': username }, cb);
}

/*
  Teams
*/

exports.findOrCreateTeam = function(team, cb) {
  Team.findOrCreate({ ownerId: team.ownerId, eventId: team.eventId }, team, cb);
}

exports.findTeamsByMemberId = function(memberId, cb) {
  Team.find({$or:[{ members: memberId }, { ownerId: memberId }]}, cb);
}

exports.addUserToTeam = function(teamId, userId, cb) {
  console.log("Adding to team:", userId);

  //Can't add current user to team if user is owner or if user is already on team
  var condition = { '_id': teamId, ownerId: { '$ne': new ObjectId(userId) } };
  var operation = { '$addToSet': { 'members': userId } };

  Team.update(condition, operation, cb);
}

exports.findTeamByOwnerId = function(ownerId, cb) {
  Team.findOne( { ownerId: ownerId }, cb);
}

/*
  Team Invites
*/

exports.createTeamInvite = function(teamId, cb) {
  TeamInvite.create( { teamId: teamId }, cb);
}

exports.deleteTeamInvite = function(inviteId, cb) {
  TeamInvite.remove({ _id: inviteId }, cb);
}

exports.findInviteById = function(codeId, cb) {
  TeamInvite.findById(codeId, cb);
}
