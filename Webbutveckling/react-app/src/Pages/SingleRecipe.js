import React, { useState, useEffect } from "react";
import ServerCalls from "../Components/ServerCalls";

const SingleRecipe = (props) => {
  /*const { getAllIngridients, responseData } = ServerCalls();
  const [allIngridients, setAllIngridients] = useState({
    ingridientList: [],
  });

  useEffect(() => {
    getAllIngridients();
    //setRecipe(responseData);
    console.log("RESPONSDATA");
    console.log(responseData);
  }, []);*/
  console.log("inne i SingleRecipe");
  console.log(props);
  console.log(props.recipeId);
  console.log(props.recipeName);
  console.log(props[0]);
  return (
    <div className="container">
      <div className="text-container-about">
        <h1 className="h1-single-recipe">{props.recipeId}</h1>
        <p>{props[0]}</p>
        <p>SIGNLE RECEPIE!</p>
      </div>
    </div>
  );
};

export default SingleRecipe;
