'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TeamSchema = new Schema({
  name:     String,
  // players: []
  players:  {
    type : Schema.Types.ObjectId,
    ref  : 'Player'
  }
});

module.exports = mongoose.model('Team', TeamSchema);
