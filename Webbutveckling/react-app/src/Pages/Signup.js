import React, { useState, useEffect } from "react";
import "../Css/Signup.css";
import useSignup from "../Components/useSignup";
import validateSignup from "../Components/validateSignup";
import SignupSuccess from "../Pages/SignupSuccess";
//import registrationFunction from "../Components/PHPCalls";
import ServerCalls from "../Components/ServerCalls";
import Home from "../Pages/Home";

function Signup() {
  /*const { handleChange, values, handleSubmit, error } = useSignup(
    validateSignup
  );
  const [submitted, setSubmitted] = useState(false);

  function submitForm() {
    setSubmitted(true);
  }*/
  const { registrationFunction, responseData } = ServerCalls();
  /*useEffect(() => {
    const {responseData} = ServerCalls();
  })*/

  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState({
    signupUsername: "",
    signupEmail: "",
    signupPassword: "",
    signupPasswordConfirmation: "",
  });
  const [error, setError] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(validateSignup(values));
    setSubmitting(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  useEffect(() => {
    if (Object.keys(error).length === 0 && submitting) {
      async function register() {
        const data = {
          username: values.signupUsername,
          password: values.signupPassword,
          email: values.signupEmail,
        };
        await registrationFunction(data);
      }
      register();
    }
  }, [error]);

  useEffect(() => {
    if (responseData.success === 1) {
      setSubmitted(true);
      console.log("Success registration");
    } else {
      console.log(responseData.success);
      console.log("WROOOOOOONG");
    }
  }, [responseData]);

  return (
    <div className="container">
      {submitted ? (
        <SignupSuccess />
      ) : (
        <div className="form-container form-container-signup">
          <form onSubmit={handleSubmit}>
            <h1 className="h1-signup">Sign up</h1>
            <input
              placeholder="Username"
              name="signupUsername"
              value={values.singupUsername}
              onChange={handleChange}
            ></input>
            {/* If error is true, display <p> tag*/}
            {error.signupUsername && (
              <p className="input-error">{error.signupUsername}</p>
            )}
            <input
              placeholder="Email"
              name="signupEmail"
              value={values.signupEmail}
              onChange={handleChange}
            ></input>
            {error.signupEmail && (
              <p className="input-error">{error.signupEmail}</p>
            )}
            <input
              placeholder="Password"
              type="password"
              name="signupPassword"
              value={values.signupPassword}
              onChange={handleChange}
            ></input>
            {error.signupPassword && (
              <p className="input-error">{error.signupPassword}</p>
            )}
            <input
              placeholder="Password confirmation"
              type="password"
              name="signupPasswordConfirmation"
              value={values.signupPasswordConfirmation}
              onChange={handleChange}
            ></input>
            {error.signupPasswordConfirmation && (
              <p className="input-error">{error.signupPasswordConfirmation}</p>
            )}
            <button type="Submit" className="button">
              Register
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Signup;
