angular.module('app')
  .controller('SearchCtrl', function ($timeout, $location, searchFactory) {
    const search = this;

    search.heading = "search working?";


    // Logout function
    search.logout = function () {
      firebase.auth().signOut()
        .then($location.path.bind($location, '/'))
        .then($timeout)
    }


    // Takes the zipcode and pulls below info from the returned api object
    search.zipcodeInput = function (zipcode) {
      searchFactory.currentTemp(zipcode).then(result => {
        console.log("result via SearchCtrl: ", result);
        search.currentTemp = result.temp_f;
        search.weatherIcon = result.icon_url;
        search.WUGpng = result.image.url;
        $timeout()
        $location.path('/search-page')
      });
    }


    // search.submit = function (user) {
    //   console.log("user in SearchCtrl", user );
    //   searchFactory.currentTemp(zipcode).then(result => {
    //     console.log("result via SearchCtrl: ", result);
    //     search.currentTemp = result.temp_f;
    //     search.weatherIcon = result.icon_url;
    //     search.WUGpng = result.image.url;
    //     $timeout()
    //     // $location.path('/populate-page')
    //   });
    // }


    // Function that stores the values choosen by the user



  });
