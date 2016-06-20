angular.module('app', ['ngRoute', 'ui.bootstrap', 'angular.filter'])
// console.log("Hello World");

  // Initialize Firebase
  firebase.initializeApp ({
    apiKey: "AIzaSyC_yMinncyZrC7PgC8ItDbDx-PZF96yFg4",
    authDomain: "fed-capstone.firebaseapp.com",
    databaseURL: "https://fed-capstone.firebaseio.com",
    storageBucket: "fed-capstone.appspot.com",
  });

  // hardcoded logout, comment out / delete once we make a logout button
  // firebase.auth().signOut()


  // Get a reference to the storage service,
  // which is used to create references in your storage bucket
  // var storage = firebase.storage();