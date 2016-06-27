angular.module('app')
  .config(($routeProvider) => {
    $routeProvider
      .when('/populate-page', {
        controller: 'PopulateCtrl',
        controllerAs: 'populate',
        templateUrl: 'populate/populate.html'
      })
  })
