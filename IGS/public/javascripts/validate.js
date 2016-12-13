
function validateForm() {

  var email = document.getElementById("email");
  var password = document.getElementById("password");


  var emailValid = isEmailValid();
  var passwordValid = isPasswordValid();

  if (emailValid && passwordValid){
    email.className = "editvieweditview";
    password.className = "editview";

    return true;
  }
  else if ((!emailValid) && (passwordValid)){
    email.className = "editview_unvalid";
    password.className = "editview";

    return false;
  }
  else if ((!passwordValid) && (emailValid)){
    email.className = "editview";
    password.className = "editview_unvalid";

    return false;
  }
  else {
    email.className = "editview_unvalid";
    password.className = "editview_unvalid";

    return false;
  }
}

function isEmailValid(){
  var email = document.getElementById("email");

  if (email.value == ""){
    return false;
  }
  else{
    var commertial_at = 0;
    for (var i = 0; i < email.value.length; i++)
      if (email.value[i] == '@')
        commertial_at++

    if (commertial_at != 1){
      return false;
    }
  }

  return true;
}

function isPasswordValid(){
  var password = document.getElementById("password");

  if (password.value == ""){
    return false;
  }
  else {
    return true;
  }
}
