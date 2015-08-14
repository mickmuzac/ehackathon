var app = angular.module("weekendmvp", ['weekendmvp.config']);

app.controller("BaseController", ['$scope', '$http', 'weekendMVPConfig', function($scope, $http, weekendMVPConfig){
  $scope.user = weekendMVPConfig.currentUser;
  $scope.team = weekendMVPConfig.currentUserTeam;
  $scope.team.fullMembers = weekendMVPConfig.currentUserTeamMembers;

  $scope.registerTeam = function(team) {
    //add some more validation here
    $http.post('/api/v1/teams/create', team)
      .success(function(doc) {
        console.log(doc);
        $scope.team = doc;
      })
  }
}]);

app.directive('invite', function() {
  return {
    template: '<button ng-hide="inviteUrl || loading" ng-click="getLink()">Generate Invite Link</button><input ng-show="inviteUrl && !loading" type="text" ng-value="inviteUrl" onclick="this.select()">',
    scope: {},
    controller: ['$scope', '$http', function($scope, $http) {
      $scope.getLink = function() {
        $scope.loading = true;
        $http.get('/api/v1/teams/invite/code')
          .success(function(doc) {
            $scope.loading = false
            $scope.inviteUrl = doc.inviteUrl;
          });
      }
    }]
  }
});
