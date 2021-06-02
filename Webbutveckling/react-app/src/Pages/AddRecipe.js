import React, { useState, useEffect } from "react";
import "../Css/AddRecipe.css";
import ValidateAddRecipe from "../Components/ValidateAddRecipe";
import ServerCalls from "../Components/ServerCalls";

function AddRecipe() {
  const [values, setValues] = useState({
    addRecipeName: "",
    addRecipeInstructions: "",
    newIngridientName: "",
    newIngridientAmount: "",
    newIngridientDropdown: "",
  });
  const [ingridients, setIngridients] = useState({
    ingridientList: [],
  });

  const { addRecipeFunction, responseData } = ServerCalls();
  /*useEffect(() => {

  }, [ingridients]);*/

  const [error, setError] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(ValidateAddRecipe(values));
    setSubmitting(true);
  };
  const handleAddIngridient = (e) => {
    e.preventDefault();
    console.log("inne i handleAddIngridient");
    if (values.newIngridientName.trim()) {
      /*const data = {
        ingridientName: values.newIngridientName,
        amount: values.newIngridientAmount,
        unit: values.newIngridientDropdown,
      };*/
      setIngridients((prevIngridients) => ({
        ingridientList: [
          ...prevIngridients.ingridientList,
          {
            ingridientName: values.newIngridientName,
            amount: values.newIngridientAmount,
            unit: values.newIngridientDropdown,
          },
        ],
      }));
    }
    resetIngridientFields();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(window.myAppData.username);
    if (Object.keys(error).length === 0 && submitting) {
      async function postRecipe() {
        const data = {
          recipeName: values.addRecipeName,
          instruction: values.addRecipeInstructions,
          uploader: "Admin",
          ingridient: ingridients.ingridientList,
        };
        await addRecipeFunction(data);
        /*if (responseData.success === 1) {
          //setSubmitted(true);
          console.log("Success registration");
        } else {
          console.log(responseData.success);
          console.log("WROOOOOOONG");
        }
        //await registrationFunction(data);

        //setSubmitted(true);*/
      }
      postRecipe();
    }
  }, [error]);

  const resetForm = () => {
    setValues({
      addRecipeName: "",
      addRecipeInstructions: "",
      newIngridientName: "",
      newIngridientAmount: "",
      newIngridientDropdown: "",
    });
  };
  const resetIngridientFields = () => {
    setValues({
      addRecipeName: values.addRecipeName,
      addRecipeInstructions: values.addRecipeInstructions,
      newIngridientName: "",
      newIngridientAmount: "",
      newIngridientDropdown: values.newIngridientDropdown,
    });
  };
  const resetIngridients = () => {
    setIngridients({
      ingridientList: [],
    });
  };
  useEffect(() => {
    if (responseData.success === 1) {
      //setSubmitted(true);
      alert("Recipe added");
      resetForm();
      resetIngridients();
      console.log("Success registration");
    } else {
      console.log(responseData.success);
      console.log("WROOOOOOONG");
    }
  }, [responseData]);

  const newIngridient = () => {
    return (
      <div className="ingridient-input-div">
        <input
          className="ingridient-input-field"
          placeholder="Ingridient name"
          name="newIngridientName"
          value={values.newIngridientName}
          onChange={handleChange}
        ></input>
        <input
          className="ingridient-input"
          placeholder="Amount"
          name="newIngridientAmount"
          value={values.newIngridientAmount}
          onChange={handleChange}
        ></input>
        <select name="newIngridientDropdown" onChange={handleChange}>
          <option value=""></option>
          <option value="gram">gram</option>
          <option value="ml">ml</option>
          <option value="cl">cl</option>
          <option value="dl">dl</option>
          <option value="pieces">piece</option>
        </select>
        <button className="button" onClick={handleAddIngridient}>
          Add ingridient
        </button>
      </div>
    );
  };
  return (
    <div className="container">
      <div className="form-container-add-recipe">
        <form onSubmit={handleSubmit}>
          <h1>Add new recipe</h1>
          <input
            placeholder="Name"
            name="addRecipeName"
            value={values.addRecipeName}
            onChange={handleChange}
          ></input>
          {error.addRecipeName && (
            <p className="input-error">{error.addRecipeName}</p>
          )}
          {newIngridient()}
          <div>
            {ingridients.ingridientList.map((ingridient) => (
              <p className="ingridients-display">
                {ingridient.ingridientName} {ingridient.amount}{" "}
                {ingridient.unit}
              </p>
            ))}
          </div>
          <textarea
            maxLength="4900"
            className="textarea-add-recipe"
            placeholder="Instructions"
            name="addRecipeInstructions"
            value={values.addRecipeInstructions}
            onChange={handleChange}
          ></textarea>
          {error.addRecipeInstructions && (
            <p className="input-error">{error.addRecipeInstructions}</p>
          )}
          <button type="submit" className="button">
            Add recipe
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddRecipe;
