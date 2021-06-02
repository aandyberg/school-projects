import React from "react";
import "./App.css";
import "./Css/Style.css";

//import "bulma/css/bulma.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Recepies from "./Pages/Recepies";
import Signup from "./Pages/Signup";
import About from "./Pages/About";
import MyProfile from "./Pages/MyProfile";
import AddRecipe from "./Pages/AddRecipe";
import PHPCalls from "./Components/PHPCalls";
import Navigation from "./Components/Navigation";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Axios from "axios";

window.myAppData = {
  username:
    "" /*Axios.get("http://www.grupp13.icsweb.se/php/get_session.php")
    .then(async (res) => {
      console.log("call från app.js");
      await console.log(res);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    }),*/,
};
function App() {
  return (
    <div className="root">
      <Router>
        <Navigation />
        {/*<CounterExample />*/}
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/recepies" component={Recepies}></Route>
          <Route path="/signup" component={Signup}></Route>
          <Route path="/about" component={About}></Route>
          <Route path="/test" component={PHPCalls}></Route>
          <Route path="/addrecipe" component={AddRecipe}></Route>
          <Route
            path={`/myprofile-"${window.myAppData.username}`}
            component={MyProfile}
          ></Route>
        </Switch>

        {/*<Footer />*/}
      </Router>
    </div>
  );
}

export default App;
