angular.module('app')
  .config(($routeProvider) => {
    $routeProvider
      .when('/main-page', {
        controller: 'MainPageCtrl',
        controllerAs: 'mainPage',
        templateUrl: 'main-page/main-page.html'
      })
      .otherwise('/')
  })
