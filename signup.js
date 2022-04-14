
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


function email_valid_check(email) 
{
  exp = /^[^@]+@\w+(\.\w+)+\w$/
  //checking whether email is correct or not via expression
  if (exp.test(email) != true) 
  {
    return false
  } 
  else 
  {
    return true
  }
}

function password_valid_check(password) 
{
  if ((password.length >= 8) && (password.length <= 16))
  {
    return true
  } 
  else
  {
    return false
  }
// password must be between 8 to 16 characters
}

function full_name_validation_check(full_name) 
{
  //full_name can not be empty and must be between 4 to 26 characters
  if ((full_name != null) && (full_name.length <= 26) && (full_name.length >= 4))
  {
    return true
  }
  else 
  {
    return false
  }
}

function username_validation_check(username) 
{
  //username can not be empty and must be between 6 to 16 characters
  if ((username != null) && (username.length <= 16) && (username.length >= 6))
  {
    return true
  }
  else 
  {
    return false
  }
}

function register () {
  
  full_name = document.getElementById('full_name').value

  email = document.getElementById('email').value
  
  username = document.getElementById('username').value
  
  password = document.getElementById('password').value

  //we have taken all the above information
  //for our register function

  if (email_valid_check(email) == false) 
  {
    alert('The email provided is incorrect!')
    return
    //email validation checking
  }
  
  else if (password_valid_check(password) == false) 
  {
    alert('The password selected must be between 8 to 16 characters!')
    return
    //password validation checking
  }

  else if(full_name_validation_check(full_name) == false)
  {
    alert('The name can not be left empty and must be between 4 to 26 characters!')
    return
  }

  else if(username_validation_check(username) == false)
  {
    alert('The username can not be empty and must be between 6 to 16 characters!')
    return
  }


  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
  
    var user = auth.currentUser
    //user variable declaring done above
    
    var database_ref = database.ref()
    //added to database
  
    var user_data = {
      full_name : full_name,
      email : email,
      username : username
    }
    //we have taken the above user data


    database_ref.child('users/' + user.uid).set(user_data)

    alert('The user has been created successfully!')
  })
  .catch(function(error) {
    var error_code = error.code
    var error_message = error.message
    //firebase errors
    
    alert(error_message)
  })
}
