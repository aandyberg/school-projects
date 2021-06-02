import React, { useState, useEffect } from "react";
import registrationFunction from "../Components/PHPCalls";

const useSignup = (validateSignup) => {
  const [values, setValues] = useState({
    signupUsername: "",
    signupEmail: "",
    signupPassword: "",
    signupPasswordConfirmation: "",
  });
  const [error, setError] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  //Prevents default submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(validateSignup(values));
    /*if (Object.keys(error).length === 0) {
      setSubmitting(true);
    }*/
  };
  /*useEffect(() => {
    if (Object.keys(error).length === 0 && submitting) {
      callback();
    }
  });*/
  return { handleChange, values, handleSubmit, error };
  //return <div></div>;
};

export default useSignup;
