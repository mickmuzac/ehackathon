//data abstraction layer api... if the database is ever swapped, then this should be
//the only file needing an update
var mongoose = require('mongoose');
var models = require('./index');

var User = mongoose.model('User', models.User, 'users');
var Event = mongoose.model('Event', models.Event, 'events');

exports.addUserToLatestEvent = function(user, cb){
  //async.js would be pretty nice here.. heh.
  var username = user.username;
  console.log("Called within addUserToLatestEvent function", username);
  exports.getNewestEvent(function(err, doc){
    console.log("Called within getNewestEvent callback", doc, err);
    if(!err){
      User.update({ 'username': username }, { '$push': { 'events':  doc._id } }, function(err){
        cb(err);
      });
    } else cb(err);
  });

}

exports.getNewestEvent = function(cb){
  console.log("Called within getNewestEvent function");
  Event.findOne({}, {}, { sort : { created: -1 } }, cb);
}
