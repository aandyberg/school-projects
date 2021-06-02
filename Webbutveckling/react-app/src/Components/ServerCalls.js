import React, { useState } from "react";
import Axios from "axios";

const ServerCalls = () => {
  const [responseData, setResponseData] = useState({});
  const [response, setResponse] = useState({});

  const api = Axios.create({
    baseURL: "http://www.grupp13.icsweb.se/php/",
  });
  const getSearchRecipes = async (data) => {
    await api
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
  };
  const getAllRecipes = async () => {
    await api
      .get("get_all.php")
      .then(async (res) => {
        //console.log(res);
        await setResponseData(res.data);
        console.log(responseData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllIngridients = async () => {
    await api
      .get("get_all_ingridients.php")
      .then(async (res) => {
        //console.log(res);
        await setResponse(res.data);
        console.log(setResponse);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const registrationFunction = async (data) => {
    console.log("inne i registrationFunction " + data);
    await api
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
      .then(async (res) => {
        console.log("REspons success code: " + res.data.success);
        await setResponseData(res.data);
        //return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const sendLoginReq = async (data) => {
    api
      .post(
        "login.php",
        {
          username: data.username,
          password: data.password,
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
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addRecipeFunction = async (data) => {
    await api
      .post(
        "add_recipe.php",
        {
          recipeName: data.recipeName,
          instruction: data.instruction,
          uploader: data.uploader,
          ingridient: data.ingridient,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then(async (res) => {
        console.log(res.data);
        await setResponseData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    getAllRecipes,
    getAllIngridients,
    registrationFunction,
    responseData,
    response,
    addRecipeFunction,
    sendLoginReq,
    getSearchRecipes,
  };
};

export default ServerCalls;
