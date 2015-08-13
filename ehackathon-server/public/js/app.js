var app = angular.module("weekendmvp", ['weekendmvp.config']);

app.controller("BaseController", ['$scope', '$http', 'weekendMVPConfig', function($scope, $http, weekendMVPConfig){
  console.log(weekendMVPConfig.currentUser);
  $scope.username = weekendMVPConfig.currentUser.username;
  console.log($scope.username)
}]);
