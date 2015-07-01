'use strict';

angular.module('draftAssistApp')
.service('teamService', function($http, Auth) {

  var that = this;
//Team functions
  //Gets user's team
 that.getTeam = function() {
    var userId = Auth.getCurrentUser()._id;
    return $http.get('/api/users/' + userId + '/team/');
  };

  //Gets all teams
  that.getAllTeams = function() {
    return $http.get('/api/teams');
  }
//Player functions
  that.addPlayer = function(player) {
    var userId = Auth.getCurrentUser()._id;
    console.log('the playerid is ' + player._id);
    return $http.post('/api/users/' + userId + '/team/' + player._id);
  };



  that.removePlayer = function(teamPlayer) {
    var userId = Auth.getCurrentUser()._id;
    return $http.delete('/api/users/' + userId + '/team/' + teamPlayer._id);
  };

  that.getPoints = function(teamPlayer) {
    return teamPlayer.qty * teamPlayer.player.projPts;
  };

  that.getTotal = function(team) {
    var total = _.reduce(team, function(sum, teamPlayer) {
      return sum + that.getPoints(teamPlayer);
    }, 0);
    return total;
  };

  that.clearTeam = function() {
    var userId = Auth.getCurrentUser()._id;
    return $http.delete('/api/users/' + userId + '/team/');
  };
});
