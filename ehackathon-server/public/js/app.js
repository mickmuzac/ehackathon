var app = angular.module("weekendmvp", ['weekendmvp.config']);

app.controller("BaseController", ['$scope', '$http', 'weekendMVPConfig', function($scope, $http, weekendMVPConfig){
  console.log(weekendMVPConfig.currentUser);
  $scope.user = weekendMVPConfig.currentUser;
  $scope.team = weekendMVPConfig.currentUserTeam;
  console.log($scope.team);

  $scope.registerTeam = function(team) {
    //add some more validation here
    $http.post('/api/v1/teams/create', team)
      .success(function(doc) {
        console.log(doc);
        $scope.team = doc;
      })
  }
}]);
