angular.module('app')
  .controller('MainPageCtrl', function (authFactory, $timeout) {
    const mainPage = this

    mainPage.user = authFactory.getUser()
    console.log("yup",mainPage.user );

    mainPage.heading = 'working?'

    firebase.database().ref('/images').on('value', (arg) => {
      mainPage.data = arg.val();
      $timeout();
    })

  })