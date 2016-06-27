angular.module('app')
  .controller('AuthCtrl', function (authFactory) {

    const auth = this;

    auth.login = function () {
      authFactory.login(auth.email, auth.password)
    }

    auth.register = function () {
      authFactory.register(auth.email, auth.password)
    }
  })
