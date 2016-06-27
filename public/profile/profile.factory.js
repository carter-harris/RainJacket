angular.module('app')
  .factory('profileFactory', ($timeout, $location, $http, FB_URL, authFactory) => {

    let currentUser = authFactory.currentUser().userId;

    console.log("currentUser: ",currentUser );



  })
