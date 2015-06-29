'use strict';

angular.module('draftAssistApp')
.config(function ($stateProvider) {
  $stateProvider
  .state('playerDetail', {
      url: '/players/:playerId',
      templateUrl: 'app/players/playerDetail/playerDetail.html',
      controller: 'PlayerDetailCtrl as ctrl'
    });
});
