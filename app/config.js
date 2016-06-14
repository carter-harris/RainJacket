angular.module('app')
  .config(($routeProvider) => {
    $routeProvider
      .when('/', {
        controller: 'AuthCtrl',
        controllerAs: 'auth',
        templateUrl: 'auth/login.html'
      })
      .otherwise('/')
  })
