'use strict';

angular.module('sampleApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, $rootScope) {
      debugger;
      if ($rootScope.currentUser) {
          $location.path('/dashboard');
      }
    $scope.logout = function() {
      Auth.logout()
      .then(function() {
        $location.path('/login');
        
      });
    };
  });
