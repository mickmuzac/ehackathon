var app = angular.module("weekendmvp", []);

app.controller("BaseController", ['$scope', '$http', function($scope, $http){
  //Add fundamental stuff to app here...
  $scope.myTeams;
  $http.get('/teams/...') // <--- delete me or entire file


}]);
