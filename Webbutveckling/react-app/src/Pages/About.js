import React from "react";
import "../Css/About.css";

function About() {
  return (
    <div className="container">
      <div className="text-container-about">
        <h1 className="h1-about">About</h1>
        <p>
          Welcome to Foody. On our website you are able to search for recipes,
          register a user account and click around on our site.
        </p>
        <p>
          Use our search funnction to search for the recipes stored in our
          database. If you are a registered user, you should be able to use our
          upload function where you can upload your own favourite recipes to our
          database and share it with the world.
        </p>
      </div>
    </div>
  );
}

export default About;
