angular
  .module('app')
  .controller('PopulateCtrl', function (authFactory, $timeout, $location, searchFactory, populateFactory, $routeParams) {

    const populate = this;

    console.log("routeParams", $routeParams);

    //
    let userSearchInput = searchFactory.getUserInput()

    // Current Temp
    populate.temp = $routeParams.temp;

    // Weather Icon
    let iconPath = $routeParams.iconURL.replace('k','i')
    populate.lol = iconPath;


    // Array for populated photos after search
    populate.photos = [];

    // Array for uploaded photos
    populate.photoURLs = []

    populate.user = authFactory.currentUser().email;



    // Logout function
    populate.logout = function() {
      firebase.auth().signOut()
        .then($location.path($location, '/'))
        .then($timeout)
    }

    // This pulls in all things under images in FB
    firebase.database().ref('/images').once('value').then((arg) => {
      let foundMatches = false;
      let searchedData = userSearchInput; // let searchedData = searchFactory.getUserInput();
      let firebaseData = arg.val();

      for (let userInfo in firebaseData) {
        let minTemp = firebaseData[userInfo].temp - 5;
        let maxTemp = firebaseData[userInfo].temp + 15;

        firebaseData[userInfo].temp = {
          min: minTemp,
          max: maxTemp
        }

        if (
          searchedData &&
          firebaseData[userInfo].gender === searchedData.gender &&
          firebaseData[userInfo].event === searchedData.event &&
          searchedData.temp > firebaseData[userInfo].temp.min &&
          searchedData.temp < firebaseData[userInfo].temp.max &&
          firebaseData[userInfo].public
        ) {
          foundMatches = true;
          populate.photos.push(firebaseData[userInfo]);
        }
      }
      // if(!foundMatches) {
      //   alert("Don't go outside...sry");
      // }
      $timeout();
    })



    // Upload photo function
    populate.upload = function () {

      let currentUser = authFactory.currentUser().userId;

      const input = document.querySelector('[type="file"]');
      const file = input.files[0];

      const randomInteger = Math.random() * 1e17;
      const getFileExtension = file.type.split('/').slice(-1)[0];
      const randomPath = `${randomInteger}.${getFileExtension}`;

      const obj = {
        img: null,
        event: userSearchInput.event,
        gender: userSearchInput.gender,
        temp: userSearchInput.temp,
        public: true,
        uid: currentUser
      }

      populateFactory.send(file, randomPath)
        .then(res => obj.img = res.downloadURL)
        .then(() => firebase.database().ref('/images').push(obj))
        .then(() => {
          $location.path('/profile-page')
          $timeout()
        })
    }



  })

  // For-in loop
  // loops over the value of the FB objects(images) and takes the users searched info(searchedData)
  // and loops over it to find the temp and compare it to the min/max temps and sees if the fields
  // match the users and compares the temps
  // then populates the photos matched with the empty array to be populated
