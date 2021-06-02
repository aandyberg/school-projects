import React, { useState } from "react";

function InputField(props) {
  const [value, setValue] = useState({
    placeholder: "",
    name: "",
    type: "text",
    value: "",
  });

  const handleChange = (e) => {
    setValue(e.target.value);
    props.onChange(e.target.name, e.target.value);
  };

  const [error, setError] = useState("");

  /*const validate = () => {
      return true; 
  }
  useImperativeHandle(ref, () => {
      return {
          validate: () => validate()
      }
  })*/

  return (
    <div className="input-div">
      {props.label && <label>{props.label}</label>}
      <input
        placeholder={props.placeholder}
        name={props.name}
        onChange={(event) => handleChange(event)}
        type={props.type}
        value={props.value ? props.value : value}
      />
    </div>
  );
}
/*InputField.defaultProps = {
  placeholder: "",
  name: "",
  type: "text",
  value: "",
};*/

export default InputField;
