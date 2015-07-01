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
  that.hidePlayer = function(player) {
    console.log('the playerid is ' + player._id)
    var playerId = player._id;
    return $http.patch('api/players/' + playerId, {selected: true});
};


});
