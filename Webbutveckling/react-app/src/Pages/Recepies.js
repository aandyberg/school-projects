import React, { useState, useEffect } from "react";
import "../Css/Recepies.css";
import ServerCalls from "../Components/ServerCalls";
import Axios from "axios";
function Recepies() {
  const {
    //getAllRecipes,
    //responseData,
    getAllIngridients,
    response,
    //getSearchRecipes,
  } = ServerCalls();
  const api = Axios.create({
    baseURL: "http://www.grupp13.icsweb.se/php/",
  });
  const [responseData, setResponseData] = useState([]);
  const [values, setValues] = useState({
    search: "",
  });
  const [currentRecepie, setCurrentRecepies] = useState({
    recipeId: "",
    recipeName: "",
    instruction: "",
    uploader: "",
  });
  const [singleRecipe, setSingleRecipe] = useState(false);
  const [handled, setHandled] = useState(false);
  useEffect(async () => {
    await getAllIngridients();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  function handleClick(e) {
    console.log("inen i click");
    e.preventDefault();
    if (!values.search.trim()) {
      api
        .get("get_all.php")
        .then(async (res) => {
          //console.log(res);
          setResponseData(res.data);
          console.log(responseData);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      let data = {
        search: values.search,
      };
      api
        .post(
          "search_recipe.php",
          {
            search: data.search,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then(async (res) => {
          //console.log(res);
          await setResponseData(res.data);
          console.log(responseData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setHandled(true);
  }
  useState(() => {
    if (handled) {
      console.log(responseData);
    }
  }, []);
  function displayRecipe() {
    console.log(responseData);
  }
  function recipeClick(e) {
    e.preventDefault();
    //console.log(e.currentTarget.id);
    let currentId = e.currentTarget.id;
    console.log(responseData);
    console.log("currentid: " + currentId);
    responseData.map((recipe) => {
      if (recipe.recipeId === currentId) {
        setCurrentRecepies({
          recipeId: recipe.recipeId,
          recipeName: recipe.recipeName,
          instruction: recipe.instruction,
          uploader: recipe.uploader,
        });
      }
    });
    setSingleRecipe(true);
  }
  function displayIngridients() {
    console.log("innei dpslay ingridient");
    let returnValue = [];
    response.forEach((ingridient) => {
      //console.log(ingridient);
      //console.log(currentRecepie);
      if (ingridient.recipeId === currentRecepie.recipeId) {
        returnValue.push(ingridient);
        //console.log("inne i if sats");
        //console.log(ingridient);
      }
    });
    //console.log(returnValue);
    return returnValue;
  }

  return (
    <div className="container-2">
      {singleRecipe ? (
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
          <h1 className="h1-recepies">Browse recepies</h1>
          <input
            className="search-input"
            placeholder="search"
            name="search"
            values={values.search}
            onChange={handleChange}
          ></input>
          <button
            type="submit"
            className="button btn-search"
            onClick={handleClick}
          >
            Search
          </button>
          <ul className="list-tags-recepies">
            <li>Vegetarian</li>
            <li>Fish</li>
            <li>Sweet</li>
            <li>Spicy</li>
          </ul>
          <div className="search-item-container">
            {responseData.map((recipe) => (
              <div
                className="searched-recepies"
                onClick={recipeClick}
                id={recipe.recipeId}
              >
                <h1>{recipe.recipeName}</h1>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Recepies;
