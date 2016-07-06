angular.module('app', ['ngRoute', 'ui.bootstrap', 'angular.filter', 'ngAnimate'])

  // Initialize Firebase
  firebase.initializeApp ({
    apiKey: "AIzaSyC_yMinncyZrC7PgC8ItDbDx-PZF96yFg4",
    authDomain: "fed-capstone.firebaseapp.com",
    databaseURL: "https://fed-capstone.firebaseio.com",
    storageBucket: "fed-capstone.appspot.com",
  });
