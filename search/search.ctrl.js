angular.module('app')
  .controller('SearchCtrl', function ($timeout, $location, searchFactory) {
    const search = this;

    // Function that stores the values choosen by the user
    search.submit = function (search) { // search is the input being passed in from the users zipcode input
      searchFactory.currentTemp(search.zipcode)
        .then(result => {
                                        // console.log("result via SearchCtrl: ", result.temp_f);
                                        // search.currentTemp = result.temp_f;
        search.temp = result.temp_f;
                                        // search.weatherIcon = result.icon_url;
                                        // search.WUGpng = result.image.url;
        firebaseObj = {
            gender: search.gender,
            event: search.event,
            temp: search.temp
        };
        console.log("firebaseObj: ", firebaseObj);
        searchFactory.setUserInput(firebaseObj);

        $timeout()
        $location.path('/populate-page')
      });
    }

      // let matchedKeyValues = firebase.database().ref('/images').equalto('festival');
      //   console.log("matchedKeyValues: ",matchedKeyValues );


   // ???? // firebase.database().ref('images').equalTo('festival')













    // Logout function
    search.logout = function () {
      firebase.auth().signOut()
        .then($location.path.bind($location, '/'))
        .then($timeout)
    }


    // Takes the zipcode and pulls below info from the returned api object
    // search.zipcodeInput = function (zipcode) {
    //   searchFactory.currentTemp(zipcode).then(result => {
    //     console.log("result via SearchCtrl: ", result);
    //     search.currentTemp = result.temp_f;
    //     search.weatherIcon = result.icon_url;
    //     search.WUGpng = result.image.url;
    //     $timeout()
    //     $location.path('/search-page')
    //   });
    // }



  });
