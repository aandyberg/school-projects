export default function validateLogin(values) {
  let errors = {};

  //Check if empty
  if (!values.loginUsername.trim()) {
    errors.loginUsername = "Input username";
  }

  if (!values.loginPassword.trim()) {
    errors.loginPassword = "Incorrect password";
  }
  //Regex no whitespaces
  else if (!/^\S+$/.test(values.loginPassword)) {
    errors.loginPassword = "Incorrect password";
  } else if (values.loginPassword.length < 6) {
    errors.loginPassword = "Incorrect password";
  }

  return errors;
}
