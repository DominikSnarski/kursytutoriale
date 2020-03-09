import React from "react";
import "./InputField.css";

export const InputField = props => {
  return (
    <input
      class="input_field"
      type={props.type}
      placeholder={props.placeholder}
    ></input>
  );
};

export default InputField;
