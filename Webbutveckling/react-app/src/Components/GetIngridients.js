import React, { useState, useEffect } from "react";
import ServerCalls from "../Components/ServerCalls";

const GetIngridients = () => {
  const { getAllIngridients, response } = ServerCalls();
  /*const [allIngridients, setAllIngridients] = useState({
    ingridientList: [],
  });*/

  useEffect(async () => {
    await getAllIngridients();
    //setRecipe(responseData);
    console.log("RESPONSDATA");
    console.log(response);
  }, []);
};

export default GetIngridients;
