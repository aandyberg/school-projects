import React, { useState, useEffect } from "react";
import Axios from "axios";

function PHPCalls(props) {
  const [recipe, setRecipe] = useState([]);

  const api = Axios.create({
    baseURL: "http://www.grupp13.icsweb.se/php/",
  });

  useEffect(() => {
    api
      .get("get_all.php")
      .then((res) => {
        console.log(res);
        setRecipe(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const test1 = {
    username: "detFunkar5555!",
    password: "testpw1",
    email: "testmail@gmail.com",
  };
  /*function registrationFunction(data) {
    console.log(data);
    api
      .post(
        "register_user.php",
        {
          username: data.username,
          password: data.password,
          email: data.email,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        console.log(res.data.success);
        setResponseData(res.data);
        //return res;
      })
      .catch((err) => {
        console.log(err);
      });
  }*/
  /*function registrationFunction(username, password, email) {
    api
      .post(
        "register_user.php",
        {
          username: username,
          password: password,
          email: email,
          //username: "testuser4",
          //password: "testpw1",
          //email: "testemail@email.com",
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }*/
  function addRecipeFunction() {
    api
      .post(
        "add_recipe.php",
        {
          recipeName: "Fried rice",
          instruction: "Put the rise in the frying pan and fry it",
          uplader: "Admin",
          ingridient: [
            {
              ingridientName: "Rice",
              amount: 500,
              unit: "gram",
            },
            {
              ingridientName: "Oil",
              amount: 1,
              unit: "tblspoon",
            },
            {
              ingridientName: "Salt",
              amount: 1,
              unit: "gram",
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  /*useEffect(() => {
    api
      .post(
        "register_user.php",
        {
          username: "testuser3",
          password: "testpw1",
          email: "testemail@email.com",
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  /*useEffect(() => {
    fetch("http://www.grupp13.icsweb.se/php/get_all.php")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  });*/

  return (
    <div>
      <h1>hej</h1>
      <ul>
        {recipe.map((recipe) => (
          <li key={recipe.recipeId}>
            id: {recipe.recipeId} <br />
            name: {recipe.recipeName} <br />
            instruction: {recipe.instruction}
            <br />
          </li>
        ))}
      </ul>
      {/*<button onClick={(e) => registrationFunction(test1)}>Press me</button>*/}
      <button onClick={(e) => addRecipeFunction()}>Add recipe</button>
    </div>
  );
}

export default PHPCalls;
