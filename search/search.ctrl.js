angular.module('app')
  .controller('SearchCtrl', function ($timeout, $location, searchFactory, authFactory, $routeParams) {
    const search = this;

    // let currentUser = authFactory.currentUser().userId;

    // Function that stores the values choosen by the user
    search.submit = function (search) {
      searchFactory.currentTemp(search.zipcode)
        .then(result => {

        search.icon = result.icon;
        search.iconURL = result.icon_url;
        console.log("icon: ", search.icon );
        console.log("icon: ", search.iconURL );
        search.temp = result.temp_f;
        search.temp = Math.floor(search.temp)

        apiObj = {
          iconURL: search.icon_url
        }

        firebaseObj = {
          gender: search.gender,
          event: search.event,
          temp: search.temp
        };

        console.log("firebaseObj: ", firebaseObj);
        searchFactory.setUserInput(firebaseObj);

        $timeout()
        $location
          .path('/populate-page')
          .search({
            gender: firebaseObj.gender,
            event: firebaseObj.event,
            temp: firebaseObj.temp,
            iconURL: apiObj.iconURL
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
