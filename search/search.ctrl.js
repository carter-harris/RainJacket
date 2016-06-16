angular.module('app')
  .controller('SearchCtrl', function ($timeout, $location) {
    const search = this;

    search.heading = "serach working?";

    // Logout function
    search.logout = function () {
      firebase.auth().signOut()
      .then($location.path.bind($location, '/'))
      .then($timeout)
    }


  })