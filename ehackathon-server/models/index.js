'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate');
var validation = require('./validation');

var User = new Schema({
  username: {
    required: true,
    type: String,
    validator: validation.genericString
  },
  created: {
    type: Date,
    default: Date.now,
    required: true,
    validator: validation.date
  },
  updated: {
    type: Date,
    default: Date.now,
    required: true,
    validator: validation.date
  },
  events: [{
    type: Schema.Types.ObjectId, 
    ref: 'Event',
    validator: validation.mongoId
  }]
});

User.plugin(findOrCreate);

var Event = new Schema({
  title: {
    required: true,
    type: String,
    validator: validation.genericString
  },
  description: {
    required: false,
    type: String,
    validator: validation.genericString
  },
  created: {
    type: Date,
    default: Date.now,
    required: true,
    validator: validation.date
  },
  updated: {
    type: Date,
    default: Date.now,
    required: true,
    validator: validation.date
  }
});

var Team = new Schema({
  title: {
    required: true,
    type: String,
    validator: validation.genericString
  },
  description: {
    required: true,
    type: String,
    validator: validation.genericString
  },
  email: {
    required: true,
    type: String,
    validate: validation.email
  },
  ownerId: {
    type: Schema.Types.ObjectId, 
    ref: 'User',
    required: true,
    validator: validation.mongoId
  },
  eventId: {
    type: Schema.Types.ObjectId, 
    ref: 'Event',
    required: true,
    validator: validation.mongoId
  },
  members: [{
    type: Schema.Types.ObjectId, 
    ref: 'User',
    validator: validation.mongoId
  }],

  created: {
    type: Date,
    default: Date.now,
    required: true,
    validator: validation.date
  },
  updated: {
    type: Date,
    default: Date.now,
    required: true,
    validator: validation.date
  }
});

var TeamInvite = new Schema({
  teamId: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
    required: true,
    validator: validation.mongoId
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