angular
  .module('app')
  .controller('PopulateCtrl', function (authFactory, $timeout, $location, searchFactory, populateFactory, $routeParams) {
    const populate = this;

    let userSearchInput = searchFactory.getUserInput()
    let conditions = $routeParams.icon;

    populate.spotlight = false;
    populate.temp = $routeParams.temp;
    populate.city = $routeParams.city;
    populate.wuURL = $routeParams.wuURL;
    populate.photos = [];
    populate.photoURLs = []
    populate.user = authFactory.currentUser().email;



    // FB SNAPSHOT
    firebase.database().ref('/images').once('value').then((arg) => {
      let foundMatches = false;
      let searchedData = searchFactory.getUserInput();
      let firebaseData = arg.val();

      // LOOP OVER IMAGES IN FB
      for (let userInfo in firebaseData) {
        let minTemp = firebaseData[userInfo].temp - 15;
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



    // UPLOAD PHOTO
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

    // UPLOAD MODAL
    populate.setSpotlight = (bool) => {
      populate.spotlight = bool;
    }


    // WEATHER ICON SWITCH STATEMENT
    switch(conditions) {
      case "cloudy":
        populate.weatherIcon = 'Y';
        break;
      case "partlycloudy":
        populate.weatherIcon = 'H';
        break;
      case "mostlycloudy":
        populate.weatherIcon = 'Y';
        break;
      case "sunny":
        populate.weatherIcon = 'B';
        break;
      case "partlysunny":
        populate.weatherIcon = 'H';
        break;
      case "mostlysunny":
        populate.weatherIcon = 'B';
        break;
      case "clear":
        populate.weatherIcon = 'B';
        break;
      case "rain":
        populate.weatherIcon = 'R';
        break;
      case "tstorms":
        populate.weatherIcon = 'P';
        break;
      case "snow":
        populate.weatherIcon = 'W';
        break;
      default:
        populate.weatherIcon = 'B';
        break;
    }

    // LOGOUT
    populate.logout = function() {
      firebase.auth().signOut()
        .then($location.path($location, '/'))
        .then($timeout)
    }

  })

  // For-in loop
  // loops over the value of the FB objects(images) and takes the users searched info(searchedData)
  // and loops over it to find the temp and compare it to the min/max temps and sees if the fields
  // match the users and compares the temps
  // then populates the photos matched with the empty array to be populated
