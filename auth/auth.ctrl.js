angular.module('app')
  .controller('AuthCtrl', function (authFactory) {
    const auth = this;

    // Passing users info into login function
    auth.login = function () {
      console.log("Fired login function from auth.ctrl.js", auth.email, auth.password);
      authFactory.login(auth.email, auth.password)
    }

    // Passing users info into register function
    auth.register = function () {
      authFactory.register(auth.email, auth.password)
    }


  })