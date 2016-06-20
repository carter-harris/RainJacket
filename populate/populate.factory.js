angular.module('app')
  .factory('uploadFactory', ($timeout) => ({
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
// was named populate factory but was changed to upload bc thats all it is doing as of now