var app = angular.module("weekendmvp", ['weekendmvp.config']);

app.controller("BaseController", ['$scope', '$http', 'weekendMVPConfig', function($scope, $http, weekendMVPConfig){
  console.log(weekendMVPConfig.currentUser);
  $scope.user = weekendMVPConfig.currentUser;
  $scope.team = weekendMVPConfig.currentUserTeam;

  $scope.registerTeam = function(team) {
    console.log('REGISTER', team);
  }
}]);
