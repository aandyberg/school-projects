import React, { useState, useEffect } from "react";
import "../Css/Login.css";
import { Link } from "react-router-dom";
import useLogin from "../Components/useLogin";
import validateLogin from "../Components/ValidateLogin";
import Axios from "axios";
import GetSession from "../Components/GetSession";
import ServerCalls from "../Components/ServerCalls";
import SignupSuccess from "../Pages/SignupSuccess";
import MyProfile from "../Pages/MyProfile";

function Login() {
  //const { handleChange, values, handleSubmit, error } = useLogin(validateLogin);
  const { sendLoginReq, responseData } = ServerCalls();
  const { getSession, respData } = GetSession();

  const [values, setValues] = useState({
    loginUsername: "",
    loginPassword: "",
  });
  const [error, setError] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  //const [session, setSession] = useState(false);
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

  const [user, setUser] = useState("");
  useEffect(() => {
    setUser(() => getSessionValue);
  }, []);

  function getSessionValue() {
    try {
      if (
        typeof Axios.get("http://www.grupp13.icsweb.se/php/get_session.php")
          .data !== "undefined"
      ) {
        return Axios.get("http://www.grupp13.icsweb.se/php/get_session.php")
          .data;
      } else {
        return "";
      }
    } catch (error) {
      return undefined;
    }
  }

  /*useEffect(async () => {
    await getSession();
    setSubmitted(false);

    if (respData.trim() !== "") {
      setUser(respData);
      setLoggedIn(true);
    } else {
      console.log("inne i else");
    }
  }, [submitted]);
*/
  /*const api = Axios.create({
    baseURL: "http://www.grupp13.icsweb.se/php/",
  });
  
  useEffect(async () => {
    console.log("inne i useeffect");
    await api
      .get("get_session.php")
      .then(async (res) => {
        console.log("inne iu denn");
        console.log(res);
        setSubmitted(false);
        if (res.data !== null) {
          window.myAppData.username = res.data;
          console.log(window.myAppData.username);
          setUser(res.data);
          console.log("inne här i if ");
          console.log(user);
          setLoggedIn(true);
        } else {
          console.log("inne i else");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [submitted]);*/

  useEffect(() => {
    if (Object.keys(error).length === 0 && submitting) {
      async function sendLoginDetails() {
        console.log(values.loginUsername);
        console.log(values.loginPassword);
        const data = {
          username: values.loginUsername,
          password: values.loginPassword,
        };
        await sendLoginReq(data);
      }
      sendLoginDetails();
      setSubmitted(true);
    }
  }, [error]);

  return (
    <div className="container">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1 className="h1-login">Login</h1>

          {/* <InputField
            name="username"
            //label="Username"
            placeholder="Username"
            onChange={handleChange}
          />
          <InputField
            name="password"
            //label="Password"
            placeholder="Password"
            onChange={handleChange}
            type="password"
          />*/}
          <input
            placeholder="Username"
            name="loginUsername"
            value={values.loginUsername}
            onChange={handleChange}
          ></input>
          {error.loginUsername && (
            <p className="input-error">{error.loginUsername}</p>
          )}
          <input
            placeholder="Password"
            name="loginPassword"
            type="password"
            value={values.loginPassword}
            onChange={handleChange}
          ></input>
          {error.loginPassword && (
            <p className="input-error">{error.loginPassword}</p>
          )}
          <button type="submit" className="button">
            Login
          </button>
          <Link to="/signup" className="button link-btn">
            Register
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
