angular.module('app')
  .controller('SearchCtrl', function ($timeout, $location, searchFactory, authFactory, $routeParams) {
    const search = this;

    // let currentUser = authFactory.currentUser().userId;

    // Function that stores the values choosen by the user
    search.submit = function (search) {
      searchFactory.currentTemp(search.zipcode)
        .then(result => {

        // console.log("search sumbit: ", result );

        search.icon = result.icon;
        search.iconURL = result.icon_url;
        search.temp = result.temp_f;
        search.temp = Math.floor(search.temp)


        firebaseObj = {
          gender: search.gender,
          event: search.event,
          temp: search.temp,
          icon: search.icon,
          iconURL: search.iconURL
        };

        // console.log("firebaseObj: ", firebaseObj);
        searchFactory.setUserInput(firebaseObj);

        $timeout()
        $location
          .path('/populate-page')
          .search({
            gender: firebaseObj.gender,
            event: firebaseObj.event,
            temp: firebaseObj.temp,
            icon: firebaseObj.icon,
            iconURL: firebaseObj.iconURL

          })
      });
    }


    // Logout function
    search.logout = function () {
      firebase.auth().signOut()
        .then($location.path($location, '/'))
        .then($timeout)
    }

  });
