angular.module('app')
  .factory('searchFactory', ($http, authFactory) => {

    let currentTemp;
    let userInput;

    return {
      currentTemp (zipcode) {
        return $http
          .get(`http://api.wunderground.com/api/94f0d7223bd72613/conditions/q/${zipcode}.json`)
          .then(result => {
            // console.log("result of get in searchFactory", result );
            currentTemp = result.data.current_observation;
            console.log("currentTemp in searchFactory", currentTemp);
            return currentTemp
          });
      },
      getCurrentTemp () {
        return currentTemp;
      },
      getUserInput () {
        return userInput;
      },
      setUserInput (formValues) {
        userInput = formValues;
      }
    } //end of the return
  })
