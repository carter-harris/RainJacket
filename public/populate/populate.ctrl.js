angular.module('app')
  .controller('PopulateCtrl', function(authFactory, $timeout, $location, searchFactory, uploadFactory) {

    const populate = this;

    let userSearchInput = searchFactory.getUserInput()

    // Array for populated photos after search
    populate.photos = [];

    populate.user = authFactory.currentUser();


    // Logout function
    populate.logout = function() {
      firebase.auth().signOut()
        .then($location.path.bind($location, '/'))
        .then($timeout)
    }



    console.log('CONTROLLER')
    // This pulls in all things under images in FB
    firebase.database().ref('/images').once('value').then((arg) => {
      console.log('onceValue')
      let foundMatches = false;
      let searchedData = searchFactory.getUserInput();
      let firebaseData = arg.val();
      console.log("firebaseData: ", firebaseData);


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
      if(!foundMatches) {
        alert("Don't go outside...sry");
      }
      $timeout();
    })


    // File Upload Section
    // $timeout()
    //   .then(() => firebase.database().ref('/images').once('value'))
    //   .then(snap => snap.val())
    //   .then(data => populate.photoUploads = data)

    populate.photoURLs = []

    // Upload photo function
    populate.upload = function () {
      const input = document.querySelector('[type="file"]');
      const file = input.files[0];

      const randomInteger = Math.random() * 1e17;
      const getFileExtension = file.type.split('/').slice(-1)[0];
      const randomPath = `${randomInteger}.${getFileExtension}`;

      uploadFactory.send(file, randomPath)
        .then(res => {
          return res.downloadURL
        })
        .then ((url) => {
          // console.log("url of send then: ", url);
          var obj = {
              img: url,
              event: userSearchInput.event,
              gender: userSearchInput.gender,
              temp: userSearchInput.temp,
              public: true
            }

          firebase.database().ref('/images')
            .push(obj)
            .then(() => populate.photos.push(obj))
            .then(() => $timeout())
        })
    }

  })



  // For-in loop
  // loops over the value of the FB objects(images) and takes the users searched info(searchedData)
  // and loops over it to find the temp and compare it to the min/max temps and sees if the fields
  // match the users and compares the temps
  // then populates the photos matched with the empty array to be populated
