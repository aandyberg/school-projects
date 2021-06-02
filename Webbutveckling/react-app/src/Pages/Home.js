import React, { useState, useEffect } from "react";
import "../Css/Home.css";
import { Link } from "react-router-dom";

import ServerCalls from "../Components/ServerCalls";

function Home() {
  const [recipe, setRecipe] = useState([]);
  const {
    getAllRecipes,
    responseData,
    getAllIngridients,
    response,
  } = ServerCalls();
  const [randomRecepies, setRandomRecepies] = useState({
    recepieList: [],
  });
  const [state, setState] = useState(false);
  const [currentRecepie, setCurrentRecepies] = useState({
    recipeId: "",
    recipeName: "",
    instruction: "",
    uploader: "",
  });
  const [ingridients, setIngridients] = useState({
    ingridientList: [],
  });

  useEffect(async () => {
    await getAllRecipes();
    await getAllIngridients();
  }, []);
  useEffect(() => {
    if (Object.keys(responseData).length < 3) {
    } else {
      setRecipe(responseData);
      for (var i = 0; i < 3; i++) {
        randomRecipe();
      }
    }
  }, [responseData]);
  useEffect(() => {
    if (Object.keys(response).length === 0) {
    } else {
      response.forEach((ingridient) => addIngridients(ingridient));
    }
  }, [response]);

  const addIngridients = (ingridient) => {
    setIngridients((prevIngridients) => ({
      ingridientList: [
        ...prevIngridients.ingridientList,
        {
          ingridientId: ingridient.ingridientId,
          ingridientName: ingridient.ingridientName,
          amount: ingridient.amount,
          unit: ingridient.unit,
          recipeId: ingridient.recipeId,
        },
      ],
    }));
  };

  function randomRecipe(int) {
    //Random integer between 1 and length of recepie array
    let randInt = Math.floor(Math.random() * responseData.length) + 1;

    let randRecipe = responseData.filter(
      (recipe) => recipe.recipeId === randInt.toString()
    );

    if (randRecipe[0].recipeId) {
      setRandomRecepies((prevRecipe) => ({
        recepieList: [
          ...prevRecipe.recepieList,
          {
            recipeId: randRecipe[0].recipeId,
            recipeName: randRecipe[0].recipeName,
            instruction: randRecipe[0].instruction,
            uploader: randRecipe[0].uploader,
          },
        ],
      }));
    }
    return randRecipe;
  }

  const handleClick1 = (e) => {
    console.log("inne här2");
    setCurrentRecepies({
      recipeId: randomRecepies.recepieList[0].recipeId,
      recipeName: randomRecepies.recepieList[0].recipeName,
      instruction: randomRecepies.recepieList[0].instruction,
      uploader: randomRecepies.recepieList[0].uploader,
    });
  };
  const handleClick2 = (e) => {
    console.log("inne här2");
    setCurrentRecepies({
      recipeId: randomRecepies.recepieList[1].recipeId,
      recipeName: randomRecepies.recepieList[1].recipeName,
      instruction: randomRecepies.recepieList[1].instruction,
      uploader: randomRecepies.recepieList[1].uploader,
    });
  };
  const handleClick3 = (e) => {
    console.log("inne här2");
    setCurrentRecepies({
      recipeId: randomRecepies.recepieList[2].recipeId,
      recipeName: randomRecepies.recepieList[2].recipeName,
      instruction: randomRecepies.recepieList[2].instruction,
      uploader: randomRecepies.recepieList[2].uploader,
    });
  };
  useEffect(() => {
    if (currentRecepie.recipeId !== "") {
      setState(true);
    }
  }, [currentRecepie]);

  function displayIngridients() {
    console.log("innei dpslay ingridient");
    let returnValue = [];
    ingridients.ingridientList.forEach((ingridient) => {
      //console.log(ingridient);
      if (ingridient.recipeId === currentRecepie.recipeId) {
        returnValue.push(ingridient);
        //console.log("inne i if sats");
        //console.log(ingridient);
      }
    });
    //console.log(returnValue);
    return returnValue;
  }

  const SingleRecipe = () => {
    console.log("inne i SingleRecipe");
    return (
      <div className="container">
        <div className="text-container-single-recipe">
          <h1 className="h1-about">{currentRecepie.recipeName}</h1>
          <div className="ingridient-div">
            {displayIngridients().map((ingridient) => (
              <li className="ingridient-li" key={ingridient.ingridientId}>
                <p>
                  {ingridient.ingridientName} {ingridient.amount}{" "}
                  {ingridient.unit}
                </p>
              </li>
            ))}
          </div>
          <p>{currentRecepie.instruction}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="container-2">
      {state ? (
        <div className="container">
          <div className="text-container-single-recipe">
            <h1 className="h1-about">{currentRecepie.recipeName}</h1>
            <div className="ingridient-div">
              {displayIngridients().map((ingridient) => (
                <li className="ingridient-li" key={ingridient.ingridientId}>
                  <p>
                    {ingridient.ingridientName} {ingridient.amount}{" "}
                    {ingridient.unit}
                  </p>
                </li>
              ))}
            </div>
            <p>{currentRecepie.instruction}</p>
          </div>
        </div>
      ) : (
        <div className="container">
          <h1 className="home-welcome">Welcome to Foody</h1>
          <h2 className="home-text">
            Here you can find all your favorite recepies
          </h2>
          <h2 className="home-text">
            Here you have 3 random recipies from our database
          </h2>
          {randomRecepies.recepieList[0] ? (
            <div className="bottom-container">
              <div className="bottom-item item-1" onClick={handleClick1}>
                <li>
                  <h2 className="display-recepie">
                    {randomRecepies.recepieList[0].recipeName}
                  </h2>
                  <p>{randomRecepies.recepieList[0].instruction}</p>
                </li>
              </div>
              <div className="bottom-item item-2" onClick={handleClick2}>
                <li>
                  <h2 className="display-recepie">
                    {randomRecepies.recepieList[1].recipeName}
                  </h2>
                  <p>{randomRecepies.recepieList[1].instruction}</p>
                </li>
              </div>
              <div className="bottom-item item-3" onClick={handleClick3}>
                <li>
                  <h2 className="display-recepie">
                    {randomRecepies.recepieList[2].recipeName}
                  </h2>
                  <p>{randomRecepies.recepieList[2].instruction}</p>
                </li>
                {/*randomRecipe().map((recipe) => (
            <li key={recipe.recipeId}>
              <h2 className="display-recepie">{recipe.recipeName}</h2>
              <p>{recipe.instruction}</p>
            </li>
                ))*/}
              </div>
            </div>
          ) : (
            <div></div>
          )}
          <div></div>
        </div>
      )}
    </div>
  );
}

export default Home;
