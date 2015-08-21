var app = angular.module("weekendmvp", ['weekendmvp.config']);

app.controller("BaseController", ['$scope', '$http', 'weekendMVPConfig', function($scope, $http, weekendMVPConfig){
  $scope.user = weekendMVPConfig.currentUser;
  $scope.team = weekendMVPConfig.currentUserTeam;
  $scope.team.fullMembers = weekendMVPConfig.currentUserTeamMembers;

  $scope.registerTeam = function(isValid) {
    if(isValid) {
      $scope.teamLoading = true;
    //add some more validation here
    $http.post('/api/v1/teams/create', $scope.teamRegister)
      .success(function(doc) {
        $scope.teamLoading = false;
        $scope.team = doc;
      })
      .error(function() {
        $scope.teamLoading = false;
        $scope.teamError = true;
      });
    } else {
      $scope.teamError = false;
    }
    
  }

  $scope.sendContact = function(isValid) {
    if(isValid) {
      $scope.contactLoading = true;
      $scope.contactLoaded = false;
      $scope.contactError = false;
      $http.post('/api/v1/contact', $scope.contact)
        .success(function() {
          $scope.contactLoaded = true;
          $scope.contactLoading = false;
          $scope.contact = {};
        })
        .error(function() {
          $scope.contactLoading = false;
          $scope.contactLoaded = true;
          $scope.contactError = true;
        })  
    } else {
      $scope.contactError = true;
    }
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
