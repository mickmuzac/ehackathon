'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate');

var User = new Schema({
  username: {
    required: true,
    type: String
  },
  created: {
    type: Date,
    default: Date.now,
    required: true
  },
  updated: {
    type: Date,
    default: Date.now,
    required: true
  },
  events: [{
    type: Schema.Types.ObjectId, 
    ref: 'Event'
  }]
});

User.plugin(findOrCreate);

var Event = new Schema({
  title: {
    required: true,
    type: String
  },
  description: {
    required: false,
    type: String
  },
  created: {
    type: Date,
    default: Date.now,
    required: true
  },
  updated: {
    type: Date,
    default: Date.now,
    required: true
  }
});

var Team = new Schema({
  title: {
    required: true,
    type: String
  },
  description: {
    required: true,
    type: String
  },
  email: {
    required: true,
    type: String
  },
  ownerId: {
    type: Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  eventId: {
    type: Schema.Types.ObjectId, 
    ref: 'Event',
    required: true
  },
  members: [{
    type: Schema.Types.ObjectId, 
    ref: 'User'
  }],

  created: {
    type: Date,
    default: Date.now,
    required: true
  },
  updated: {
    type: Date,
    default: Date.now,
    required: true
  }
});

var TeamInvite = new Schema({
  teamId: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  redeemed: {
    type: Boolean,
    required: true,
    default: false
  }
});

Team.plugin(findOrCreate);

exports.User = User;
exports.Event = Event;
exports.Team = Team;
exports.TeamInvite = TeamInvite;