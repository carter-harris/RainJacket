;angular.module('app')
  .controller('ProfileCtrl', function(authFactory, $timeout, $location, searchFactory, FB_URL) {

    const profile = this;

    let currentUser = authFactory.currentUser().userId;

    // profile.deleteImage = function (key) {
    //   firebase.database().ref(`images/${key}`).remove()
    //   $timeout()
    // }

    profile.deleteImage = function (key, data) {
      firebase.database().ref(`images/${key}/uid`).set(null);
      let index = profile.data.indexOf(data);
      profile.data.splice(index, 1);
      $timeout()
    }

    firebase.database()
      .ref('/images/')
      .orderByChild('uid')
      .equalTo(currentUser)
      .on("value", (snap) => {
        console.log("key", snap.val() );
        profile.data = snap.val();
        $timeout();
    })

  });