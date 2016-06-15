angular.module('app')
  .controller('AuthCtrl', function (authFactory, FB_URL) {
    const auth = this;
      // var ref = new Firebase(`${FB_URL}`)

    // Passing users info into login function
    auth.login = function () {
      console.log("Fired login function from auth.ctrl.js", auth.email, auth.password);
      authFactory.login(auth.email, auth.password)
      // var ref = new Firebase(`${FB_URL}.json`)
      // console.log("firebase.getAuth() :", firebase.getAuth());
    }

    // Passing users info into register function
    auth.register = function () {
      authFactory.register(auth.email, auth.password)
    }
  })