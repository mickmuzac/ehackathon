//data abstraction layer api... if the database is ever swapped, then this should be
//the only file needing an update
var mongoose = require('mongoose');
var models = require('.');

var User = mongoose.model('User', models.User, 'users');
var Event = mongoose.model('Event', models.Event, 'events');

exports.addUserToLatestEvent = function(username, cb){
  //async.js would be pretty nice here.. heh.
  exports.getNewestEvent(function(err, doc){
    if(!err){
      User.update({ 'username': username }, { '$push': { 'events':  doc.id } }, function(err){
        cb(err);
      });
    } else cb(err);
  });

}

exports.getNewestEvent = function(cb){
  Event.findOne({}, {}, { sort : { created: -1 } }, cb);
}
