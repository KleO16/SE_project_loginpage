
const firebaseConfig = {
  //configuration taken from firebase database
  apiKey: "AIzaSyCOpacXY7blJEoaJnAWl849LHMbfMFpkPs",
  authDomain: "se-project-6d350.firebaseapp.com",
  projectId: "se-project-6d350",
  storageBucket: "se-project-6d350.appspot.com",
  messagingSenderId: "454259972450",
  appId: "1:454259972450:web:512c7601382f16a287f43b"
};


// firebase initializing
firebase.initializeApp(firebaseConfig);

// variables initializing
const auth = firebase.auth()
const database = firebase.database()



function forgotpass()
//forgot password link function
{
    var Registered_email = document.getElementById("Registered_email")
    auth.sendPasswordResetEmail(Registered_email.value)
    .then(() => {
        alert("Check your registered email address for the reset passkey link")
    })
    .catch((error) => {
          var error_code = error.code
          var error_message = error.message
          alert('Please input the email id')
    });
}



function login () {
  Registered_email = document.getElementById('Registered_email').value
  Passkey = document.getElementById('Passkey').value
  //required inputs to log in

  auth.signInWithEmailAndPassword(Registered_email, Passkey)
  .then(function() {
    
    var user = auth.currentUser
    var database_ref = database.ref()
    //user data created and added to firebase
    
    var user_data = {
      last_login : Date.now()
    }
    
    database_ref.child('users/' + user.uid).update(user_data)
    alert('You have successfully logged in user!')

  })
  .catch(function(error) {
    var error_code = error.code
    var error_message = error.message
    //firebase errors
    alert(error_message)
  })
}
