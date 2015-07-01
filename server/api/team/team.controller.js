'use strict';

var _ = require('lodash');
var Team = require('./team.model');
var Player = require('../player/player.model');
var User = require('../user/user.model');

// //Not using this
// function findPlayerInTeam(user, id) {
//   return _.find(user.team, function(player) {
//     console.log(' 1 the user team is' + user.team + '---2 the iterate is' + JSON.stringify(player));
//     console.log('Comparing ' + player.players + ' to ' + id);
//     console.log(player.players + " is user team");
//     return player.equals(id) || player._id.equals(id);
//   });
// }

// Get the team from the DB.
exports.get = function(req, res) {
  console.log('get, url = ' + req.url);
  var userId = req.params.userid;
  console.log('userId: ' + userId);
//New function

User.findById(userId, function(err, user) {
      if (err) { return handleError(res, err); }
      if (!user) { return res.send(404); }
      var teamId = user.team;

      Team.findById(teamId).populate("players").exec(function(err, team) {
        if (err) { return handleError(res, err); }
        if (!team) { return res.send(404); }
        console.log('returning team: ' + JSON.stringify(team.players));
        res.json(200, team.players);

      });//end team.findbyid
    });//end user.findbyid

//
  // User.findById(userId)
  // .populate('team.players')
  // .exec(function(err, user) {
  //   console.log('user: ' + user.name + ' team: ' + user.team.players );
  //   if (err) { return handleError(res, err); }
  //   if (!user) { return res.send(404); }
  //   console.log('returning team: ' + JSON.stringify(user.team.players));
  //   res.json(200, user.team.players);
  // });

};//end of export.get function

// Add a new player to the team or update the qty and return the team.
exports.addPlayer = function(req, res) {
  console.log('addPlayer, url = ' + req.url);
  // console.log('userid is' + req.params.userid + 'playerid is: ' + req.params.playerid);
  var userId = req.params.userid.trim();
  var playerId = req.params.playerid.trim();

  console.log('userId: ' + userId + ', playerId: ' + playerId);

  Player.findById(playerId, function(err, player) {
    if (err) { return handleError(res, err); }
    if (!player) { return res.send(404); }

    User.findById(userId, function(err, user) {
      if (err) { return handleError(res, err); }
      if (!user) { return res.send(404); }
      //grab teamId here b/c can't get it from the URL
      var teamId = user.team;
      // console.log('var teamId ====>>' + user.team);


      Team.findById(teamId).populate("players").exec(function(err, team) {
        if (err) { return handleError(res, err); }
        if (!team) { return res.send(404); }

//   // TODO: add Team.findById


  // TODO: probably delete this function and the findPlayerInTeam
      // Check if player is already in team ===== Why would we use this?
      // var found = findPlayerInTeam(user, player._id);
      // if (found) {
      //   console.log('Found player ' + player.name + ' in team, therefore incrementing qty');
      //   found.qty = found.qty + 1;
      // }
      // else {
      //   console.log('Adding player to team: ' + player.name);
        // console.log('the user is:' + user + 'the users team is' + team + 'the usersteamplayer are ' + team.players );
        // console.log('the user-team-players is array?' + Array.isArray(team.players));
        team.players.push(player);


      // }
        team.save(function() {
          // team.populate('players', function(err, player) {
            console.log('the player saved is' + player);
            return res.json(201, player );
          // });

        });
     }); //end team.findbyid
    });//end user.findbyid

  });//end player.findbyid

};

// Remove an player from the team and return the team.
exports.removePlayer = function(req, res) {
  console.log('removePlayer, url = ' + req.url);
  var userId = req.params.userid;
  var teamPlayerId = req.params.playerid;
  console.log('userId: ' + userId + ', teamPlayerId: ' + teamPlayerId);

  // Remove the player, get the updated team, and return the team
  User.findById(userId, function(err, user) {
    if (err) { return handleError(res, err); }
    if (!user) { return res.send(404); }

    // Check if player is already in team
    // var found = findPlayerInCart(user, teamPlayerId);
    // if (found) {
    //   console.log('Removing player from team');
    //   user.team.pull(found._id);               // pull is a feature of MongooseArray!
    // }
    // else {
    //   return res.send(404);
    // }
    user.save(function() {
      user.populate('team.player', function(err, user) {
        return res.json(201, user.team );
      });
    });
  });
};

// Remove all players from the team in the DB.
exports.removeAllPlayers = function(req, res) {
  console.log('removeAllPlayers, url = ' + req.url);
  var userId = req.params.userid;
  console.log('userId: ' + userId);

  // remove all players from team and return the team
  User.findById(userId, function(err, user) {
    if (err) { return handleError(res, err); }
    if (!user) { return res.send(404); }

    user.team = [];
    user.save(function() {
      user.populate('team.player', function(err, user) {
        return res.send(204, user.team);
      });
    });
  });
}

function handleError(res, err) {
  return res.send(500, err);
}
