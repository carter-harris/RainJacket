angular.module('app')
  .controller('PopulateCtrl', function(authFactory, $timeout, $location, searchFactory, uploadFactory) {
    const populate = this;

    // Array for populated photos after search
    populate.photos = [];

    populate.user = authFactory.getUser()
    // console.log("yup",populate.user );


    // Logout function
    populate.logout = function() {
      firebase.auth().signOut()
        .then($location.path.bind($location, '/'))
        .then($timeout)
    }

    // This pulls in all things under images in FB
    firebase.database().ref('/images').on('value', (arg) => {
      let foundMatches = false;
      let searchedData = searchFactory.getUserInput();
      let firebaseData = arg.val();
      console.log("firebaseData: ", firebaseData);

      // For-in loop
      // loops over the value of the FB objects(images) and takes the users searched info(searchedData)
      // and loops over it to find the temp and compare it to the min/max temps and sees if the fields
      // match the users and compares the temps
      // then populates the photos matched with the empty array to be populated
      for (let userInfo in firebaseData) {

        let minTemp = firebaseData[userInfo].temp - 5;
        let maxTemp = firebaseData[userInfo].temp + 15;

        firebaseData[userInfo].temp = {
          min: minTemp,
          max: maxTemp
        }

        if (firebaseData[userInfo].gender === searchedData.gender &&
           firebaseData[userInfo].event === searchedData.event &&
           searchedData.temp > firebaseData[userInfo].temp.min &&
           searchedData.temp < firebaseData[userInfo].temp.max &&
           firebaseData[userInfo].public
        ) {
          foundMatches = true;
          populate.photos[populate.photos.length] = firebaseData[userInfo];
        }
      }
      if(!foundMatches) {
        alert("Don't go outside...sry");
      }
      $timeout();
    })


///////// all of this was added below to do the file upload


    $timeout()
     .then(() => firebase.database().ref('/images').once('value'))
     .then(snap => snap.val())
     .then(data => populate.photoUploads = data)

     populate.photoURLs = []

    // Upload photo function
    populate.upload = function(uploadarg) {
      console.log("uploadarg: ", uploadarg);
      const input = document.querySelector('[type="file"]');
      const file = input.files[0];

      const randomInteger = Math.random() * 1e17;
      const getFileExtension = file.type.split('/').slice(-1)[0];
      const randomePath = `${randomInteger}.${getFileExtension}`;

      uploadFactory.send(file, randomePath)
        .then(res => {
          console.log("res of send (): ", res );
          console.log("res.downloadURL:    ", res.downloadURL);
          populate.photoURLs.push(res.downloadURL)
          return res.downloadURL
        })
        .then ((url) => {
          console.log("url of send then: ", url);
          firebase.database().ref('/images').push({url})
        })

    }

  })
