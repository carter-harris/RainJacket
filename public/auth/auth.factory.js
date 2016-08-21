angular.module('app')
  .factory('authFactory', ($timeout, $location, $http, FB_URL) => {

    let userId;
    let userEmail;
    let token;


    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        userId = user.uid;
        userEmail = user.email;
        user.getToken()
          .then(t => token = t)
          .then(() => $location.path('/search-page'))
          .then($timeout)
      } else {
        $location.path('/');
        $timeout();
      }
    })


    return {
      login (email, password) {
        firebase.auth().signInWithEmailAndPassword(email,password)
      },
      register (email, password) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(data => ($http.put(`${FB_URL}users/${data.uid}.json?auth=${data.Wc}`, {
            userId: data.uid,
            email: data.email
          })))
          // .catch((error) => (alert(error.message)));
      },

      currentUser () {
        return {
          userId: userId,
          email: userEmail,
          auth: token
        }
      }
    }

  })
