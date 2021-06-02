export default function validateAddRecipe(values) {
  let errors = {};

  //Check if empty
  console.log(values);
  if (!values.addRecipeName.trim()) {
    errors.addRecipeName = "Input required";
  }

  if (!values.addRecipeInstructions.trim()) {
    errors.addRecipeInstructions = "Input required";
  }

  return errors;
}
