angular.module('app')
  .controller('PopulateCtrl', function(
    authFactory, $timeout, $location,
    searchFactory) {
    const populate = this;

    populate.photos = [];

    populate.user = authFactory.getUser()
      // console.log("yup",populate.user );

    populate.heading = 'working?'


    // This pulls in all things under images in FB
    firebase.database().ref('/images').on('value', (arg) => {
      let searchedData = searchFactory.getUserInput();
      let firebaseData = arg.val();
      console.log("firebaseData: ", firebaseData);

      // For-in loop
      // loops over the value of the FB objects(images) and takes the users searched info(searchedData)
      // and loops over it to find the temp and compare it to the min/max temps and sees if the fields
      // match the users and compares the temps
      // then populates the photos matched with the empty array to be populated
      for (let userInfo in
          firebaseData) {

        let minTemp = firebaseData[userInfo].temp - 5;
        let maxTemp = firebaseData[userInfo].temp + 15;

        firebaseData[userInfo].temp = {
          min: minTemp,
          max: maxTemp
        }

        if (firebaseData[userInfo] .gender === searchedData.gender &&
           firebaseData[userInfo].event ===searchedData.event &&
           searchedData.temp > firebaseData[userInfo].temp.min &&
           searchedData.temp < firebaseData[userInfo].temp.max
        ) {
          populate.photos[populate.photos.length] = firebaseData[userInfo];
        } else {
          console.log("nope");
        }
      }
      $timeout();
    })

    // Logout function
    populate.logout = function() {
      firebase.auth().signOut()
        .then($location.path.bind($location, '/'))
        .then($timeout)
    }

  })
