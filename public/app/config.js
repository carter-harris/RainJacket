angular.module('app')
  .config(($routeProvider) => {
    $routeProvider
      .when('/', {
        templateUrl: 'app/partials/home.html'
      })
      .when('/todo', {
        templateUrl: 'app/partials/todo.html',
        controller: 'TodoCtrl',
        controllerAs: 't',
      })
      .when('/hello', {
        templateUrl: 'app/partials/hello.html',
        controller: 'HelloCtrl',
        controllerAs: 'hello',
      })
      .when('/hello/:name', {
        templateUrl: 'app/partials/hello-person.html',
        controller: 'HelloPersonCtrl',
        controllerAs: 'helloPerson',
      })
      .otherwise('/')
  })
