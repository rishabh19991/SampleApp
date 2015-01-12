'use strict';
angular.module('sampleApp')
    .factory('UsersUnique', function ($resource) {
        return {
            uniqueemail: function () {
                return $resource('api/users/uniqueemail/:email');
            },
            uniqueusername: function () {
                return $resource('/api/users/uniquename/:username');
            }
        }
    });

angular.module('sampleApp').factory('UsersList', ['$resource', function ($resource) {
    return $resource('/api/users/:searchController/:searchId/:pageController/:pagenum', {
        searchId: '@searchId',
        searchController: '@searchController',
        pagenum: '@pagenum',
        pageController: '@pageController'
    });
}]);

angular.module('sampleApp').factory('updateUser', ['$resource', function ($resource) {
    return $resource('/api/users/update/:id', {
        id: '@id'
    }, { //parameters default
        update: {
            method: 'PUT',
            params: {}
        }
    });
}]);

angular.module('sampleApp').factory('newUser', ['$resource', function ($resource) {
    return $resource('/api/users/save', {
    });
}]);


angular.module('sampleApp')
  .factory('User', function ($resource) {
      return $resource('/api/users/:id', {
          id: '@id'
      }, { //parameters default
          update: {
              method: 'PUT',
              params: {}
          },
          get: {
              method: 'GET',
              params: {
                  id: 'me'
              }
          }
      });
  });
