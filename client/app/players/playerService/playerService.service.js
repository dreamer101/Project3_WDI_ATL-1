'use strict';

angular.module('draftAssistApp')
  .service('playerService', function ($http) {

 var that = this;

  that.findPlayerById = function(id) {
    return $http.get('/api/players/' + id);
  };

  that.getPlayers = function() {
    return $http.get('/api/players');
  };
//TODO: finish this
//targets player in DB and changes their status
  that.hidePlayer = function(player) {
    console.log('===>>the playerid  being hidden is ' + player._id)
    var playerId = player._id;
    return $http.patch('api/players/' + playerId, {selected: true});
};


});
