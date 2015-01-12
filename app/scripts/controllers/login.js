'use strict';


angular.module('sampleApp')
  .controller('LoginCtrl', function ($scope, Auth, Session, $location, $routeParams) {
    $scope.user = {};
    $scope.errors = {};

    // check login credentials
    $scope.login = function (form) {
        debugger;
      $scope.submitted = true;
      if(form.$valid) {
        Auth.login({
          username: $scope.user.username,
          password: $scope.user.password
        })
        .then( function(err) {
          // todo : redirect to admin dashboard
          $location.path('/dashboard');
        })
        .catch( function(err) { 
          err = err.data;
          $scope.errors.other = err.message;
          
        });
      }
    };      
  });

