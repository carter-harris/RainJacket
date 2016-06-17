angular.module('app')
  .factory('authFactory', ($timeout, $location, $http, FB_URL) => {

    let currentUser = null;

    // Listener that fires on login or logout state of change
    firebase.auth().onAuthStateChanged(function(user) {

      // console.log("user of onAuthStateChanged: ", user);
      if (user) {
        currentUser = user; // could just target uid here
        // $location.path('/search-page'); // was populate-page, just testing to see if everything is working
        $location.path('/search-page');
        $timeout();
      } else {
        currentUser = null;
        $location.path('/');
        $timeout();
      }
    }); // end of onAuthStateChanged function


    // This is all being returned into authFactory for used elsewhere
    return {
      // Register function and grabs users infor crom createUser function below
      register (email, password) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        // This below, once the user registers, makes an argument called user,
        // that executes a function called 'createUser' below and pass in the arugment user.
        // The function on line 27 is where it is being executed
        // .then(user => createUser(user))
      },

      // Login Function
      login (email, password) {
        firebase.auth().signInWithEmailAndPassword(email,password)
      },

      // Returning 'currentUser' so it can be accessed through 'authFactory' in other files
      getUser() {
        return currentUser;
      }
    } // end of the return
  }) // end of factory










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

