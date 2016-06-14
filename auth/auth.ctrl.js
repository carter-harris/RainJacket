angular.module('app')
  .controller('AuthCtrl', function (authFactory) {
    const auth = this;

    auth.login = function () {
      console.log("Fired login function from auth.ctrl.js", auth.email, auth.password);
      authFactory.login(auth.email, auth.password)
    }

    auth.register = function () {
      authFactory.register(auth.email, auth.password)
    }
  })