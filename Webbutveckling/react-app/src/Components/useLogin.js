import React, { useState } from "react";

const useLogin = (validateLogin) => {
  const [values, setValues] = useState({
    loginUsername: "",
    loginPassword: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(validateLogin(values));
    setSubmitting(true);
  };

  return { handleChange, values, handleSubmit, error };
};

export default useLogin;
