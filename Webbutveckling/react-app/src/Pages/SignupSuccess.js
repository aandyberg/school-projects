import React from "react";
import { Link } from "react-router-dom";
import "../Css/SignupSuccess.css";

function SignupSuccess() {
  return (
    <div className="container">
      <div className="text-container-signup-success">
        <h1 className="h1-signup-success">Signed up successfully!</h1>
        <p>Your account registered successfully.</p>
        <Link to="/login" className="button link-btn btn-signup-success">
          Login
        </Link>
      </div>
    </div>
  );
}

export default SignupSuccess;
