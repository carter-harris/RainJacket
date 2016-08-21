angular.module('app')
  .controller('ProfileCtrl', function(authFactory, $timeout, $location, searchFactory, FB_URL) {
    const profile = this;

    let currentUser = authFactory.currentUser().userId;

    // Delete Image function
    profile.deleteImage = function (key, data) {
      firebase.database().ref(`images/${key}/uid`).set(null);
      let index = profile.data.indexOf(data);
      profile.data.splice(index, 1);
      $timeout()
    }

    // Reference of FB database of images
    firebase.database()
      .ref('images/')
      .orderByChild('uid')
      .equalTo(currentUser)
      .on("value", (snap) => {
        console.log("key", snap.val() );
        profile.data = snap.val();
        $timeout();
    })

    // LOGOUT
    profile.logout = function() {
      firebase.auth().signOut()
        .then($location.path($location, '/'))
        .then($timeout)
    }

  });
