angular.module('app')
  .controller('SearchCtrl', function ($timeout, $location, searchFactory, authFactory, $routeParams) {
    const search = this;

    // let currentUser = authFactory.currentUser().userId;

    // Function that stores the values choosen by the user
    search.submit = function () { // took search out of the arg of this function
      searchFactory.currentTemp(search.zipcode)
        .then(result => { console.log("WU Obj: ", result);

        search.icon = result.icon;
        search.iconURL = result.icon_url;
        search.temp_f = result.temp_f;
        search.temp = Math.floor(search.temp_f)
        search.city = result.display_location.city;
        search.wind = result.wind_gust_mph;
        search.wuURL = result.forecast_url;

        firebaseObj = {
          gender: search.gender,
          event: search.event,
          temp: search.temp,
          icon: search.icon,
          iconURL: search.iconURL,
          city: search.city,
          wind: search.wind,
          wuURL: search.wuURL
        };

        searchFactory.setUserInput(firebaseObj);

        $timeout()

        $location
          .path('/populate-page')
          .search({
            gender: firebaseObj.gender,
            event: firebaseObj.event,
            temp: firebaseObj.temp,
            icon: firebaseObj.icon,
            iconURL: firebaseObj.iconURL,
            city: firebaseObj.city,
            wind: firebaseObj.wind,
            wuURL: firebaseObj.wuURL

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
