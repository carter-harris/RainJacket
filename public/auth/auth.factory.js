angular.module('app')
  .factory('authFactory', ($timeout, $location, $http, FB_URL) => {

    // let currentUser = null;
    let userId;
    let userEmail;
    let token;


    firebase.auth().onAuthStateChanged((user) => {
      if (user) { // currentUser = user;
        userId = user.uid;
        userEmail = user.email;
        user.getToken()
          .then(t => token = t)
          .then(() => $location.path('/search-page'))
          .then($timeout)
      } else { // currentUser = null;
        $location.path('/');
        $timeout();
      }
    });


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
          .catch((error) => (alert(error.message)));
      },

      // Returning 'currentUser' so it can be accessed through 'authFactory' in other files
      // getUser() {
      //   return currentUser;
      // },

      currentUser () {
        return {
          userId: userId,
          email: userEmail,
          auth: token
        }
      }
    }
  })

  // .then($location.path.bind($location, `/search-page/${userId}`))

  // TOOK THIS OUT, WAS ABOVE THE RETURN BEFORE

  // Making of the object via users info, be registering, FB returns
  // an object that call (below??) then I pass 'user' into this function
  // to have the objects information, then I make an object called newUser.
  // createUser = function (user) {
  //   let newUser = { // makes two keys and adds the FB objects keys values to the keys made
  //     email: user.email,
  //     uid: user.uid,
  //   }
  //   console.log("newUser: ", newUser );

  //   // This 'post', post to FB via the key we made in FB called user.
  //   // The second argument 'newUser' is the object we made to be posted in FB.
  //   // $http.post(`https://fed-capstone.firebaseio.com.json`, newUser)
  //   // $http.post(`${FB_URL}.json`, newUser)
  //   // .then();
  // }
