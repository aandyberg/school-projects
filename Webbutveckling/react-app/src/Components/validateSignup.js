export default function validateSignup(values) {
  let errors = {};

  //Signup
  //Check if empty
  if (!values.signupUsername.trim()) {
    errors.signupUsername = "Username required";
  }

  if (!values.signupEmail.trim()) {
    errors.signupEmail = "Email required";
    //Regex no whitespace + @ + no whitespace + . letters  ignore case
  } else if (!/^\S+@\S+\.[a-z]+$/i.test(values.signupEmail)) {
    errors.signupEmail = "Invalid email address";
  }

  if (!values.signupPassword) {
    errors.signupPassword = "Password required";
  }
  //Regex no whitespaces
  else if (!/^\S+$/.test(values.signupPassword)) {
    errors.signupPassword = "No whitespaces allowed";
  } else if (values.signupPassword.length < 6) {
    errors.signupPassword = "Password need minimum 6 charachters";
  }
  if (!values.signupPasswordConfirmation) {
    errors.signupPasswordConfirmation = "Password confirmation required";
  } else if (values.signupPasswordConfirmation !== values.signupPassword) {
    errors.signupPasswordConfirmation = "Passwords does not match";
  }

  return errors;
}
