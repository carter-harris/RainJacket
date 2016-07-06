angular.module('app')
  .factory('populateFactory', ($timeout, searchFactory) => ({
    send (file, path = file.name) {
      return $timeout().then(() => (
        new Promise ((resolve, reject) => {
          const uploadTask = firebase.storage().ref()
            .child(path).put(file)

            uploadTask.on('state_changed',
              null,
              reject,
              () => resolve(uploadTask.snapshot)
            )
        })
      ))
    }
  }))
