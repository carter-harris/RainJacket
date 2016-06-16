angular.module('app')
  .config(($routeProvider) => {
    $routeProvider
      .when('/search-page', {
        controller: 'SearchCtrl',
        controllerAs: 'search',
        templateUrl: 'search/search.html'
      })
      .otherwise('/')
  })
