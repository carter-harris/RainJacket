angular.module('app')
  .controller('PopulateCtrl', function (authFactory, $timeout, $location) {
    const populate = this;

    populate.user = authFactory.getUser()
    console.log("yup",populate.user );

    populate.heading = 'working?'

    firebase.database().ref('/images').on('value', (arg) => {
      populate.data = arg.val();
      $timeout();
    })

    // Logout function
    populate.logout = function () {
      firebase.auth().signOut()
      .then($location.path.bind($location, '/'))
      .then($timeout)
    }
  })