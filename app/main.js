angular.module('app', ['ngRoute', 'ui.bootstrap', 'angular.filter'])
console.log("Hello World");

  // Initialize Firebase
  firebase.initializeApp ({
    apiKey: "AIzaSyC_yMinncyZrC7PgC8ItDbDx-PZF96yFg4",
    authDomain: "fed-capstone.firebaseapp.com",
    databaseURL: "https://fed-capstone.firebaseio.com",
    storageBucket: "",
  });

  // hardcoded logout, comment out / delete once we make a logout button
  firebase.auth().signOut()