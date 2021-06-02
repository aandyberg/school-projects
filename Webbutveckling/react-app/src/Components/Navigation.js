import React, { useState, useEffect } from "react";
import "../Css/Navigation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import logo from "../Images/foody2.0.png";
import { Link, useLocation } from "react-router-dom";
import Axios from "axios";

//logo color #0fa4f9
function Navigation() {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  const [showLogout, setShowLogout] = useState({
    showLogout: false,
    showLogin: true,
  });

  function handleClick(e) {
    console.log(location.pathname);
    console.log("inne i handleclick här");
    if (location.pathname === "/") {
      console.log("inne i handleclick");
      window.location.reload();
    }
  }
  function waitTwoSeconds(newState) {
    setTimeout(function () {
      if (newState == -1) {
      }
    }, 2000);
  }
  function handleLogout(e) {
    e.preventDefault();
    console.log("handleLogout");
    /*setShowLogout({
      showLogin: true,
      showLogout: false,
    });
    console.log("ine i handle logout");
    window.myAppData.username = "";
    console.log("Inne i ifsatsen " + window.myAppData.username);
    Axios.post("http://www.grupp13.icsweb.se/php/logout.php")
      .then(async (res) => {
        console.log("call från app.js");
        console.log(res);
        console.log("inann ifsatsen " + window.myAppData.username);
        if (res.data === null || res.data === "") {
          window.myAppData.username = "";
          console.log("Inne i ifsatsen " + window.myAppData.username);
        }
        console.log(window.myAppData.username);
      })
      .catch((err) => {
        console.log(err);
      });
    waitTwoSeconds();
    window.location = "http://www.grupp13.icsweb.se";*/
  }
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
  /*const [user, setUser] = useState("");
  useEffect(() => {
    setUser(getSessionValue);
  }, []);
*/

  useState(() => {
    if (() => getSessionValue === "") {
      setShowLogout({
        showLogin: true,
        showLogout: false,
      });
    }
  });

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
        if (res.data === null || res.data === "") {
          setShowLogout({
            showLogout: false,
            showLogin: true,
          });
        } else {
          setShowLogout({
            showLogout: true,
            showLogin: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);*/

  /*useEffect(() => {
    console.log(window.myAppData.username);
    if (
      window.myAppData.username === "" ||
      window.myAppData.username === null
    ) {
      setShowLogout({
        showLogout: false,
        showLogin: true,
      });
    } else {
      setShowLogout({
        showLogout: true,
        showLogin: false,
      });
    }
  }, [window.myAppData.username]);*/

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={handleClick}>
        <Link to="/">
          <img className="logo-nav" src={logo} alt="Foody" />
        </Link>
      </div>
      <div className="burger-icon">
        <FontAwesomeIcon
          icon={faBars}
          size="2x"
          onClick={() => setShowMenu(!showMenu)}
        />
      </div>
      {/* Show menu true set is-active*/}
      <div className={`navbar-menu ${showMenu ? "is-active" : ""}`}>
        <ul>
          <Link
            to="/"
            className="navbar-item"
            onClick={(e) => {
              setShowMenu(false);
              handleClick(e);
            }}
          >
            <li>Home</li>
          </Link>

          <Link
            to="/recepies"
            className="navbar-item"
            onClick={() => setShowMenu(false)}
          >
            <li>Recepies</li>
          </Link>

          <Link
            to="/addrecipe"
            className="navbar-item"
            onClick={() => setShowMenu(false)}
          >
            <li>Add Recepies</li>
          </Link>

          <Link
            to="/about"
            className="navbar-item"
            onClick={() => setShowMenu(false)}
          >
            <li>About</li>
          </Link>
        </ul>
      </div>
      <div
        className={`navbar-right navbar-menu ${showMenu ? "is-active" : ""}`}
      >
        <div>
          <ul>
            <Link
              to="/signup"
              className="navbar-item"
              onClick={() => setShowMenu(false)}
            >
              <li>Sign up</li>
            </Link>

            <Link
              to="/login"
              className="navbar-item"
              onClick={() => setShowMenu(false)}
            >
              <li>Login</li>
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
