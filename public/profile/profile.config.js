angular.module('app')
  .config(($routeProvider) => {
    $routeProvider
      .when('/profile-page', {
        controller: 'ProfileCtrl',
        controllerAs: 'profile',
        templateUrl: 'profile/profile-page.html'
      })
      .otherwise('populate/populate.html')
  })
